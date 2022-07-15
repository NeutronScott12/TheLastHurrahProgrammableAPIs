import { ApolloError } from '@apollo/client'

import {
    DeleteThreadCommentDocument,
    DeleteThreadCommentMutation,
    DeleteThreadCommentMutationVariables,
} from '../../generated/graphql'

import { deleteCommentHelper } from '../helpers/functions'

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
            update(cache, { data }) {
                deleteCommentHelper({
                    data,
                    comment_id,
                    cache,
                    thread_id,
                    application_short_name,
                    sort,
                    limit,
                    skip,
                })
            },
        })
    } catch (error) {
        console.log('ERROR', error)
        if (error instanceof ApolloError) {
            throw new ApolloError(error)
        }
    }
}
