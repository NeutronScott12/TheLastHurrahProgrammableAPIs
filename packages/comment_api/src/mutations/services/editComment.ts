import { ApolloError } from '@apollo/client'
import {
    EditThreadCommentDocument,
    EditThreadCommentMutation,
    EditThreadCommentMutationVariables,
} from '../../generated/graphql'
import { editComemntHelper } from '../helpers/functions'
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
                editComemntHelper({
                    thread_id,
                    data,
                    cache,
                    skip,
                    limit,
                    application_short_name,
                    sort,
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
