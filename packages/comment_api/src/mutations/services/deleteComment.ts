import { ApolloError } from '@apollo/client'
import { clone, mergeDeepRight } from 'ramda'
import {
    DeleteThreadCommentDocument,
    DeleteThreadCommentMutation,
    DeleteThreadCommentMutationVariables,
} from '../../generated/graphql'
import {
    fetchCommentByThreadIdQueryCache,
    WriteCommentByThreadIdQueryArgs,
} from '../../helpers'
import { CommentAPIErrors } from '../../helpers/errors'
import { ICommentAPI, IDeleteCommentArgs } from '../types'

export const deleteComment = async (
    args: IDeleteCommentArgs,
    global: ICommentAPI,
) => {
    try {
        const { comment_id, thread_id } = args
        const { limit, skip, sort, application_short_name, client } = global

        return await client.mutate<
            DeleteThreadCommentMutation,
            DeleteThreadCommentMutationVariables
        >({
            mutation: DeleteThreadCommentDocument,
            variables: { commentId: comment_id },
            update(cache) {
                const response = fetchCommentByThreadIdQueryCache({
                    thread_id,
                    limit,
                    skip,
                    sort,
                    application_short_name,
                    cache: global.cache,
                })

                if (response && response.fetch_comments_by_thread_id) {
                    const cloned = clone(response)
                    const filteredList =
                        cloned.fetch_comments_by_thread_id.comments.filter(
                            (data) => data.id !== comment_id,
                        )

                    const newData = mergeDeepRight(cloned, {
                        fetch_comments_by_thread_id: {
                            __typename:
                                cloned.fetch_comments_by_thread_id.__typename,
                            comments_count:
                                cloned.fetch_comments_by_thread_id
                                    .comments_count,
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
