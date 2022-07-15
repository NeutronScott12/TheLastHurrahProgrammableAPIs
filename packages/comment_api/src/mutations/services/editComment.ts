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
            update(cache, { data }) {},
        })
    } catch (error) {
        console.log('ERROR', JSON.stringify(error, null, 2))
        if (error instanceof ApolloError) {
            throw new ApolloError(error)
        }
    }
}
