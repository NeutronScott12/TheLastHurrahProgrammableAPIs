import { ApolloError } from '@apollo/client'
import {
    FindOneOrCreateOneThreadDocument,
    FindOneOrCreateOneThreadQuery,
    FindOneOrCreateOneThreadQueryVariables,
} from '../../generated/graphql'
import { ICommentAPI, IFindOrCreateOneThreadInputArgs } from '../types'

export const findOneOrCreateOneThread = async (
    args: IFindOrCreateOneThreadInputArgs,
    global: ICommentAPI,
) => {
    try {
        const { client } = global

        return client.query<
            FindOneOrCreateOneThreadQuery,
            FindOneOrCreateOneThreadQueryVariables
        >({
            query: FindOneOrCreateOneThreadDocument,
            variables: {
                findOrCreateOneThreadInput: {
                    ...args,
                },
            },
        })
    } catch (error) {
        console.log('ERROR', JSON.stringify(error, null, 2))
        if (error instanceof ApolloError) {
            throw new ApolloError(error)
        }
    }
}
