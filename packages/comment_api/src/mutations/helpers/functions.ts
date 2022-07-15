import { ApolloCache } from '@apollo/client'
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
    EditThreadCommentMutation,
    Sort,
} from '../../generated/graphql'
import {
    fetchCommentByThreadIdQueryCache,
    WriteCommentByThreadIdQueryArgs,
} from '../../helpers'

interface ICreateCommentHelper {
    thread_id: string
    limit: number
    skip: number
    application_short_name: string
    data: CreateCommentMutation | null | undefined
    sort: Sort
    cache: ApolloCache<any>
}

export const createCommentHelper = ({
    thread_id,
    limit,
    skip,
    application_short_name,
    sort,
    cache,
    data,
}: ICreateCommentHelper) => {
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

interface IEditCommentHelper {
    thread_id: string
    limit: number
    skip: number
    application_short_name: string
    sort: Sort
    data: EditThreadCommentMutation | null | undefined
    cache: ApolloCache<any>
}

export const editComemntHelper = ({
    thread_id,
    limit,
    skip,
    application_short_name,
    sort,
    data,
    cache,
}: IEditCommentHelper) => {
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
