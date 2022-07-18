import { ApolloError } from '@apollo/client'
import {
    CreateCommentDocument,
    CreateCommentInput,
    CreateCommentMutation,
    CreateCommentMutationVariables,
} from '../../generated/graphql'

import { createCommentHelper } from '../helpers/functions'
import { ICommentAPI } from '../types'

export const createComment = async (
    args: CreateCommentInput,
    global: ICommentAPI,
) => {
    const { application_id, json_body, plain_text_body, thread_id } = args

    const { client, limit, skip, application_short_name, sort } = global

    try {
        return await client.mutate<
            CreateCommentMutation,
            CreateCommentMutationVariables
        >({
            mutation: CreateCommentDocument,
            variables: {
                createCommentInput: {
                    application_id,
                    json_body,
                    plain_text_body,
                    thread_id,
                },
            },
            update(cache, { data }) {
                createCommentHelper({
                    thread_id,
                    limit,
                    skip,
                    application_short_name,
                    sort,
                    cache,
                    data,
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
