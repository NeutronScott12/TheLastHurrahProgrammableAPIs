import { ApolloError } from '@apollo/client'
import {
    CreateReplyCommentDocument,
    CreateReplyCommentInput,
    CreateReplyCommentMutation,
    CreateReplyCommentMutationVariables,
} from '../../generated/graphql'

import { createReplyHelper } from '../helpers/functions'

import { ICommentAPI } from '../types'

export const createReplyComment = async (
    args: CreateReplyCommentInput,
    global: ICommentAPI,
) => {
    try {
        const {
            plain_text_body,
            json_body,
            thread_id,
            parent_id,
            replied_to_id,
            application_id,
        } = args
        const { client, limit, skip, sort, application_short_name } = global

        return await client.mutate<
            CreateReplyCommentMutation,
            CreateReplyCommentMutationVariables
        >({
            mutation: CreateReplyCommentDocument,
            variables: {
                CreateReplyCommentInput: {
                    plain_text_body,
                    json_body,
                    application_id,
                    thread_id,
                    parent_id,
                    replied_to_id,
                },
            },
            update(cache, { data }) {
                createReplyHelper({
                    thread_id,
                    data,
                    cache,
                    skip,
                    limit,
                    sort,
                    application_short_name,
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
