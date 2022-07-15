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
import { deleteReplyCommentHelper } from '../helpers/functions'
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
                deleteReplyCommentHelper({
                    application_short_name,
                    cache,
                    comment_id,
                    parent_id: parent_id ? parent_id : null,
                    limit,
                    skip,
                    sort,
                    thread_id,
                })
            },
        })
    } catch (error) {
        console.log('ERROR', JSON.stringify(error, null, 2))
        if (error instanceof ApolloError) {
            throw new ApolloError(error)
        }
    }
}
