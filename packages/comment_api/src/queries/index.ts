import {
    ApolloClient,
    ApolloError,
    ApolloQueryResult,
    NormalizedCacheObject,
} from '@apollo/client'
import { Client } from '@urql/core'
import request, { GraphQLClient } from 'graphql-request'
import { FetchCommentsQuery, FetchCommentsDocument } from '../generated/graphql'

interface ICommentQueriesArgs {
    client: ApolloClient<NormalizedCacheObject>
}

export class CommentQueries {
    client: ApolloClient<NormalizedCacheObject>

    constructor({ client }: ICommentQueriesArgs) {
        this.client = client
    }

    public async fetch_comemnts() {
        try {
            // this.client.query
            console.log('FETCH_COMEMNT_CLIENT', this.client)
            console.log('FETCH_COMMENT_CLIENT_QUERY', this.client.query)

            // Apollo request returns undefined on the client
            const result = await this.client.query<FetchCommentsQuery>({
                query: FetchCommentsDocument,
            })

            console.log('FETCH_COMEMNT_CLIENT_RESULT', result)

            //The graphql-request returns the correct response.

            // const response = await this.graphql_request_client.request(
            //     FetchCommentsDocument,
            // )

            // console.log('GRAPHQL-REQUEST', response)

            return result
        } catch (error) {
            console.log('ERROR', error)
            if (error instanceof ApolloError) {
                throw new ApolloError(error)
            }

            throw new Error(
                `Something really bad happened at fetch_comments - ${error}`,
            )
        }
    }
}
