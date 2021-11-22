import { ApolloError } from '@apollo/client'
import {
    always,
    clone,
    curry,
    evolve,
    findIndex,
    map,
    mergeDeepRight,
    propEq,
    when,
} from 'ramda'
import {
    DeleteThreadCommentDocument,
    DeleteThreadCommentMutation,
    DeleteThreadCommentMutationVariables,
} from '../../generated/graphql'
import {
    fetchCommentByThreadIdQueryCache,
    WriteCommentByThreadIdQueryArgs,
} from '../../helpers'
import { ICommentAPI, IDeleteReplyCommentArgs } from '../types'

export const deleteReplyComment = async (
    args: IDeleteReplyCommentArgs,
    global: ICommentAPI,
) => {
    try {
        const { reply_comment_id, parent_id, thread_id } = args
        const { client, limit, skip, application_short_name, sort } = global

        const comment_id = reply_comment_id

        return await client.mutate<
            DeleteThreadCommentMutation,
            DeleteThreadCommentMutationVariables
        >({
            mutation: DeleteThreadCommentDocument,
            variables: {
                commentId: comment_id,
            },
            update(cache) {
                const response = fetchCommentByThreadIdQueryCache({
                    thread_id,
                    limit,
                    skip,
                    application_short_name,
                    sort,
                    cache: global.cache,
                })

                console.log('RESPONSE', response)
                console.log('PARENT_ID', parent_id)

                if (
                    response &&
                    response.fetch_comments_by_thread_id &&
                    parent_id
                ) {
                    const cloned = clone(response)
                    let comments = cloned.fetch_comments_by_thread_id.comments
                    let newComments

                    if (comments) {
                        const parent_index = findIndex(
                            (comment) => comment.id === parent_id,
                            comments,
                        )

                        console.log('PARENT_INDEX', parent_index)

                        let newReplies = comments[parent_index].replies.filter(
                            (comment) => {
                                console.log('COMMENT', comment)
                                return comment.id !== comment_id
                            },
                        )

                        console.log('NEW_REPLIES', newReplies)

                        const fn = curry((id, prop, content) =>
                            map(
                                when(
                                    propEq('id', id),
                                    evolve({ [prop]: always(content) }),
                                ),
                            ),
                        )

                        newComments = Array.from(
                            fn(parent_id, 'replies', newReplies)(comments),
                        )
                        // comments[parent_index].replies = newReplies
                    }

                    console.log('NEW_COMMENTS', newComments)

                    const newData = mergeDeepRight(cloned, {
                        fetch_comments_by_thread_id: {
                            __typename:
                                response.fetch_comments_by_thread_id.__typename,
                            comments_count:
                                cloned.fetch_comments_by_thread_id
                                    .comments_count,

                            comments: newComments,
                        },
                    })

                    cache.evict({
                        fieldName: 'CommentModel',
                        broadcast: false,
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
        console.log('ERROR', JSON.stringify(error, null, 2))
        if (error instanceof ApolloError) {
            throw new ApolloError(error)
        }
    }
}
