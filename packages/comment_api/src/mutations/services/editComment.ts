import { ApolloError } from '@apollo/client'
import {
    clone,
    findIndex,
    propEq,
    update,
    insert,
    remove,
    curry,
    map,
    when,
    evolve,
    always,
    mergeDeepRight,
} from 'ramda'
import {
    EditThreadCommentDocument,
    EditThreadCommentMutation,
    EditThreadCommentMutationVariables,
} from '../../generated/graphql'
import {
    fetchCommentByThreadIdQueryCache,
    WriteCommentByThreadIdQueryArgs,
} from '../../helpers'
import { ICommentAPI, IEditCommentArgs } from '../types'

export const editComment = async (
    args: IEditCommentArgs,
    global: ICommentAPI,
) => {
    try {
        const { plain_text_body, json_body, comment_id, thread_id } = args
        const { client, limit, skip, application_short_name, sort } = global

        return await client.mutate<
            EditThreadCommentMutation,
            EditThreadCommentMutationVariables
        >({
            mutation: EditThreadCommentDocument,
            variables: {
                UpdateCommentInput: {
                    plain_text_body,
                    json_body,
                    comment_id,
                },
            },
            update(cache, { data }) {
                console.log(
                    'EDIT_INPUT',
                    thread_id,
                    limit,
                    skip,
                    application_short_name,
                    sort,
                )

                const response = fetchCommentByThreadIdQueryCache({
                    thread_id,
                    limit,
                    skip,
                    application_short_name,
                    sort,
                    cache: global.cache,
                })

                console.log('EDIT_COMMENT_RESPONSE', response)

                if (
                    response &&
                    response.fetch_comments_by_thread_id &&
                    data &&
                    data.update_comment
                ) {
                    let clonedData = clone(response)
                    let comments =
                        clonedData.fetch_comments_by_thread_id.comments
                    let newComments

                    if (!data.update_comment.parent_id) {
                        const index = findIndex(
                            propEq('id', data.update_comment.id),
                        )(comments)

                        newComments = update(
                            index,
                            data.update_comment,
                            comments,
                        )
                    } else {
                        console.log('SHOULD NOT BE RUNNING')
                        const replies = comments.find(
                            (comment) =>
                                comment.id === data.update_comment.parent_id,
                        )?.replies

                        if (replies) {
                            const replyIndex = replies.findIndex(
                                (comment) =>
                                    comment.id === data.update_comment.id,
                            )

                            const filtered_reply = remove(
                                replyIndex,
                                1,
                                replies,
                            )

                            const newReplies = insert(
                                replyIndex,
                                data.update_comment,
                                filtered_reply,
                            )

                            const fn = curry((id, prop, content) =>
                                map(
                                    when(
                                        propEq('id', id),
                                        evolve({
                                            [prop]: always(content),
                                        }),
                                    ),
                                ),
                            )

                            newComments = Array.from(
                                fn(
                                    data.update_comment.parent_id,
                                    'replies',
                                    newReplies,
                                )(comments),
                            )
                        }
                    }

                    const newData = {
                        fetch_comments_by_thread_id: {
                            __typename:
                                response.fetch_comments_by_thread_id.__typename,
                            comments_count:
                                clonedData.fetch_comments_by_thread_id
                                    .comments_count,
                            comments: newComments,
                        },
                    }

                    const changedObject = mergeDeepRight(clonedData, newData)

                    WriteCommentByThreadIdQueryArgs({
                        thread_id,
                        limit,
                        skip,
                        sort,
                        application_short_name,
                        data: changedObject,
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
