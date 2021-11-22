import { ApolloError } from '@apollo/client'
import { clone, mergeDeepRight } from 'ramda'
import {
    CreateReplyCommentDocument,
    CreateReplyCommentInput,
    CreateReplyCommentMutation,
    CreateReplyCommentMutationVariables,
} from '../../generated/graphql'
import {
    fetchCommentByThreadIdQueryCache,
    WriteCommentByThreadIdQueryArgs,
} from '../../helpers'
import { CommentAPIErrors } from '../../helpers/errors'
import { ICommentAPI, IReplyCommentArgs } from '../types'

export const createReplyComment = async (
    args: CreateReplyCommentInput,
    global: ICommentAPI,
) => {
    try {
        const {
            plain_text_body,
            json_body,
            thread_id,
            parent_id,
            replied_to_id,
            application_id,
        } = args
        const { client, limit, skip, sort, application_short_name } = global

        return await client.mutate<
            CreateReplyCommentMutation,
            CreateReplyCommentMutationVariables
        >({
            mutation: CreateReplyCommentDocument,
            variables: {
                CreateReplyCommentInput: {
                    plain_text_body,
                    json_body,
                    application_id,
                    thread_id,
                    parent_id,
                    replied_to_id,
                },
            },
            update(cache, { data }) {
                const response = fetchCommentByThreadIdQueryCache({
                    thread_id,
                    limit,
                    skip,
                    sort,
                    application_short_name,
                    cache: global.cache,
                })

                if (data && response?.fetch_comments_by_thread_id) {
                    const cloned = clone(response)

                    if (cloned.fetch_comments_by_thread_id.comments) {
                        //@ts-ignore
                        cloned.fetch_comments_by_thread_id.comments
                            .find(
                                (comment) =>
                                    comment.id ===
                                    data.create_reply_comment.parent_id,
                            )
                            .replies.push(data.create_reply_comment)
                    }

                    console.log('CLONED', cloned)

                    const newData = mergeDeepRight(cloned, {
                        fetch_comments_by_thread_id: {
                            __typename:
                                response.fetch_comments_by_thread_id.__typename,
                            comments_count:
                                cloned.fetch_comments_by_thread_id
                                    .comments_count,
                            comments:
                                cloned.fetch_comments_by_thread_id.comments,
                        },
                    })

                    WriteCommentByThreadIdQueryArgs({
                        thread_id,
                        limit,
                        skip,
                        sort,
                        application_short_name,
                        data: newData,
                        cache: global.cache,
                    })
                }
            },
        })
    } catch (error) {
        console.log('ERROR', error)
        if (error instanceof ApolloError) {
            throw new ApolloError(error)
        }
    }
}
