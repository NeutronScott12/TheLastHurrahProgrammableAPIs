import { faker } from '@faker-js/faker'

import { CommentAPI } from '../../CommentAPI'
import {
    DeleteManyCommentsDocument,
    DeleteManyCommentsMutation,
    DeleteManyCommentsMutationFn,
    DeleteManyCommentsMutationVariables,
    DeleteThreadByIdDocument,
    DeleteThreadByIdMutation,
    DeleteThreadByIdMutationVariables,
    Sort,
} from '../../generated/graphql'
import { CommentMutations } from '../index'

describe('Mutation Tests', () => {
    let commentMutations: CommentMutations
    let commentApi: CommentAPI

    let comment_id: string
    let thread_id: string
    let comment_author_id: string
    let thread: any
    let reply_comment_id: string
    const plain_text_body = 'This is test for comments'
    const plain_text_reply = 'This is test for replies'
    const application_id = '6064eb0c-08c9-4dea-87e7-89574a210644'

    beforeEach(async () => {
        commentApi = new CommentAPI(
            'http://localhost:4000/graphql',
            'first-application',
        )

        commentMutations = new CommentMutations({
            client: commentApi.client,
            application_short_name: 'first-application',
            limit: 10,
            skip: 0,
            sort: Sort.Asc,
            cache: commentApi.cache,
        })

        thread = await commentMutations.findOneOrCreateOneThread({
            application_id,
            title: 'practice title',
            website_url: 'localhost:3000',
        })

        if (!thread) {
            throw new Error('Thread needed')
        }

        thread_id = thread.data.find_one_thread_or_create_one.id
    })

    it('Create Comment', async () => {
        console.log('thread', thread)
        const comment = await commentMutations.createComment({
            application_id,
            json_body: [
                {
                    type: 'paragraph',
                    children: [
                        { text: 'At-least the functionality seems to work' },
                    ],
                },
            ],
            plain_text_body,
            thread_id,
        })

        console.log('COMMENT', comment)

        if (comment && comment.data) {
            const {
                id,
                thread_id: t_id,
                plain_text_body: body,
                author: { id: authorId },
            } = comment.data.create_comment

            comment_id = id
            comment_author_id = authorId

            expect(body).toMatch(plain_text_body)
            expect(thread_id).toMatch(t_id)
        }
    })

    it('Create Reply Comment', async () => {
        const reply = await commentMutations.createReplyComment({
            plain_text_body: plain_text_reply,
            replied_to_id: comment_author_id,
            json_body: [
                {
                    type: 'paragraph',
                    children: [
                        { text: 'At-least the functionality seems to work' },
                    ],
                },
            ],
            parent_id: comment_id,
            application_id,
            thread_id,
        })

        if (reply && reply.data) {
            const {
                id,
                parent_id,
                thread_id: reply_thread_id,
            } = reply.data.create_reply_comment

            reply_comment_id = id
            expect(parent_id).toMatch(comment_id)
            expect(reply_thread_id).toMatch(thread_id)
        }

        expect(reply).toBeDefined()
    })

    it('Edit Comment', async () => {
        const edited_comment = faker.lorem.sentence()

        console.log('COMMENT_ID', comment_id)

        const result = await commentMutations.editComment({
            comment_id,
            json_body: [
                {
                    type: 'paragraph',
                    children: [
                        {
                            text: 'Changed At-least the functionality seems to work',
                        },
                    ],
                },
            ],
            plain_text_body: edited_comment,
            thread_id,
        })

        console.log('RESULT', result)
    })

    it('Delete Comment', async () => {
        const result = await commentMutations.deleteComment({
            comment_id,
            thread_id,
        })

        if (result && result.data) {
            const { success } = result.data.delete_comment

            expect(success).toBeTruthy()
        }
    })

    it('Delete Reply Comment', async () => {
        const result = await commentMutations.deleteReplyComment({
            parent_id: comment_id,
            reply_comment_id,
            thread_id,
        })

        if (result && result.data) {
            const { success } = result.data.delete_comment

            expect(success).toBeTruthy()
        }
    })

    it('upvote comment', async () => {
        const result = await commentMutations.upVoteComment(comment_id)

        expect(result.data?.up_vote_comment.up_vote).toHaveLength(1)
    })

    it('downvote comment', async () => {
        const result = await commentMutations.downVoteComment(comment_id)

        console.log(result.data?.down_vote_comment)

        expect(result.data?.down_vote_comment.down_vote).toHaveLength(1)
    })

    afterAll(async () => {
        try {
            const result = await commentApi.client.mutate<
                DeleteManyCommentsMutation,
                DeleteManyCommentsMutationVariables
            >({
                mutation: DeleteManyCommentsDocument,
                variables: {
                    deleteManyCommentsInput: {
                        comment_ids: [comment_id, reply_comment_id],
                        permanent_delete: true,
                    },
                },
            })

            console.log('RESULT', result)

            if (result && result.data) {
                const { success } = result.data?.delete_many_comments

                expect(success).toBeTruthy()
            }

            const thread_result = await commentApi.client.mutate<
                DeleteThreadByIdMutation,
                DeleteThreadByIdMutationVariables
            >({
                mutation: DeleteThreadByIdDocument,
                variables: {
                    deleteThreadInput: {
                        id: thread_id,
                    },
                },
            })

            console.log('THREAD_RESULT', thread_result)

            if (thread_result && thread_result.data) {
                const { success } = thread_result.data.delete_thread_by_id

                expect(success).toBeTruthy()
            }
        } catch (error) {
            console.log(
                'DELETE_MANY_COMMENTS_ERROR',
                JSON.stringify(error, null, 2),
            )
        }
    })
})
