import {
    clone,
    findIndex,
    mergeDeepRight,
    propEq,
    update,
    remove,
    insert,
    curry,
    map,
    when,
    evolve,
    always,
} from 'ramda'
import {
    CreateCommentMutation,
    CreateReplyCommentMutation,
    DeleteThreadCommentMutation,
    EditThreadCommentMutation,
    Maybe,
} from '../../generated/graphql'
import {
    fetchCommentByThreadIdQueryCache,
    WriteCommentByThreadIdQueryArgs,
} from '../../helpers'
import { IHelperArgs } from '../types'

interface ICreateCommentHelperArgs extends IHelperArgs {
    data: CreateCommentMutation | null | undefined
}

export const createCommentHelper = ({
    thread_id,
    limit,
    skip,
    application_short_name,
    sort,
    cache,
    data,
}: ICreateCommentHelperArgs) => {
    const response = fetchCommentByThreadIdQueryCache({
        thread_id,
        limit,
        skip,
        application_short_name,
        sort,
        cache,
    })

    if (
        response &&
        response.fetch_comments_by_thread_id &&
        data &&
        data.create_comment
    ) {
        const cloneData = clone(response)
        const newData = {
            fetch_comments_by_thread_id: {
                __typename: response.fetch_comments_by_thread_id.__typename,
                comments_count:
                    cloneData.fetch_comments_by_thread_id.comments_count,
                comments: [
                    data.create_comment,
                    ...cloneData.fetch_comments_by_thread_id.comments,
                ],
            },
        }

        const changedObject = mergeDeepRight(cloneData, newData)

        WriteCommentByThreadIdQueryArgs({
            thread_id,
            limit,
            skip,
            sort,
            application_short_name,
            data: changedObject,
            cache,
        })
    }
}

interface IEditCommentHelperArgs extends IHelperArgs {
    data: EditThreadCommentMutation | null | undefined
}

export const editComemntHelper = ({
    thread_id,
    limit,
    skip,
    application_short_name,
    sort,
    data,
    cache,
}: IEditCommentHelperArgs) => {
    console.log(
        'EDIT_INPUT',
        thread_id,
        limit,
        skip,
        application_short_name,
        sort,
    )

    // console.log('CACHE', cache)

    const response = fetchCommentByThreadIdQueryCache({
        thread_id,
        limit,
        skip,
        application_short_name,
        sort,
        cache,
    })

    console.log('EDIT_COMMENT_RESPONSE', response)

    if (
        response &&
        response.fetch_comments_by_thread_id &&
        data &&
        data.update_comment
    ) {
        let clonedData = clone(response)
        let comments = clonedData.fetch_comments_by_thread_id.comments
        let newComments

        if (!data.update_comment.parent_id) {
            const index = findIndex(propEq('id', data.update_comment.id))(
                comments,
            )

            newComments = update(index, data.update_comment, comments)
        } else {
            console.log('SHOULD NOT BE RUNNING')
            const replies = comments.find(
                (comment) => comment.id === data.update_comment.parent_id,
            )?.replies

            if (replies) {
                const replyIndex = replies.findIndex(
                    (comment) => comment.id === data.update_comment.id,
                )

                const filtered_reply = remove(replyIndex, 1, replies)

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
                __typename: response.fetch_comments_by_thread_id.__typename,
                comments_count:
                    clonedData.fetch_comments_by_thread_id.comments_count,
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
            cache,
        })
    }
}

interface IDeleteCommentHelperArgs extends IHelperArgs {
    comment_id: string
    data: DeleteThreadCommentMutation | null | undefined
}

export const deleteCommentHelper = ({
    thread_id,
    limit,
    skip,
    application_short_name,
    sort,
    cache,
    comment_id,
}: IDeleteCommentHelperArgs) => {
    const response = fetchCommentByThreadIdQueryCache({
        thread_id,
        limit,
        skip,
        sort,
        application_short_name,
        cache,
    })

    if (response && response.fetch_comments_by_thread_id) {
        const cloned = clone(response)
        const filteredList = cloned.fetch_comments_by_thread_id.comments.filter(
            (data) => data.id !== comment_id,
        )

        const newData = mergeDeepRight(cloned, {
            fetch_comments_by_thread_id: {
                __typename: cloned.fetch_comments_by_thread_id.__typename,
                comments_count:
                    cloned.fetch_comments_by_thread_id.comments_count,
                comments: [...filteredList],
            },
        })

        WriteCommentByThreadIdQueryArgs({
            thread_id,
            limit,
            skip,
            sort,
            application_short_name,
            data: newData,
            cache,
        })
    }
}

interface IDeleteReplyCommentHelperArgs extends IHelperArgs {
    parent_id: Maybe<string> | undefined
    comment_id: string
}

export const deleteReplyCommentHelper = ({
    thread_id,
    limit,
    skip,
    application_short_name,
    sort,
    cache,
    parent_id,
    comment_id,
}: IDeleteReplyCommentHelperArgs) => {
    const response = fetchCommentByThreadIdQueryCache({
        thread_id,
        limit,
        skip,
        application_short_name,
        sort,
        cache,
    })

    console.log('RESPONSE', response)
    console.log('PARENT_ID', parent_id)

    if (response && response.fetch_comments_by_thread_id && parent_id) {
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
                    when(propEq('id', id), evolve({ [prop]: always(content) })),
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
                __typename: response.fetch_comments_by_thread_id.__typename,
                comments_count:
                    cloned.fetch_comments_by_thread_id.comments_count,

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
            cache,
        })
    }
}

interface ICreateReplyHelperArgs extends IHelperArgs {
    data: CreateReplyCommentMutation | null | undefined
}

export const createReplyHelper = ({
    thread_id,
    limit,
    skip,
    sort,
    application_short_name,
    cache,
    data,
}: ICreateReplyHelperArgs) => {
    const response = fetchCommentByThreadIdQueryCache({
        thread_id,
        limit,
        skip,
        sort,
        application_short_name,
        cache,
    })

    if (data && response?.fetch_comments_by_thread_id) {
        const cloned = clone(response)

        if (cloned.fetch_comments_by_thread_id.comments) {
            //@ts-ignore
            cloned.fetch_comments_by_thread_id.comments
                .find(
                    (comment) =>
                        comment.id === data.create_reply_comment.parent_id,
                )
                .replies.push(data.create_reply_comment)
        }

        console.log('CLONED', cloned)

        const newData = mergeDeepRight(cloned, {
            fetch_comments_by_thread_id: {
                __typename: response.fetch_comments_by_thread_id.__typename,
                comments_count:
                    cloned.fetch_comments_by_thread_id.comments_count,
                comments: cloned.fetch_comments_by_thread_id.comments,
            },
        })

        WriteCommentByThreadIdQueryArgs({
            thread_id,
            limit,
            skip,
            sort,
            application_short_name,
            data: newData,
            cache,
        })
    }
}
