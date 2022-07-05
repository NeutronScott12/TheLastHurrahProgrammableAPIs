import {
    ApolloClient,
    ApolloError,
    ApolloQueryResult,
    NormalizedCacheObject,
} from '@apollo/client'
import { Client } from '@urql/core'
import request from 'graphql-request'
import { FetchCommentsQuery, FetchCommentsDocument } from '../generated/graphql'

export class CommentQueries {
    client: ApolloClient<NormalizedCacheObject>

    constructor(
        client: ApolloClient<NormalizedCacheObject>,
        // client: Client,
    ) {
        this.client = client
    }

    public async fetch_comemnts() {
        try {
            // this.client.query
            console.log('FETCH_COMEMNT_CLIENT', this.client)
            console.log('FETCH_COMMENT_CLIENT_QUERY', this.client.query)
            // const response = await this.client.query<FetchCommentsQuery>({
            //     query: FetchCommentsDocument,
            // })

            const response: ApolloQueryResult<FetchCommentsQuery> =
                await request(
                    'http://localhost:4000/graphql',
                    FetchCommentsDocument,
                    {},
                    {
                        Authorization:
                            'Bearer ' +
                            localStorage.getItem('binary-stash-token'),
                    },
                )

            console.log('GRAPHQL-REQUEST', response)

            return response
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
