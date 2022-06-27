import {
    ApolloClient,
    ApolloError,
    ApolloQueryResult,
    NormalizedCacheObject,
} from '@apollo/client'
import { FetchCommentsQuery, FetchCommentsDocument } from '../generated/graphql'

export class CommentQueries {
    public client: ApolloClient<NormalizedCacheObject>

    constructor(client: ApolloClient<NormalizedCacheObject>) {
        this.client = client
    }

    public async fetch_comemnts() {
        try {
            console.log('FETCH_COMEMNT_CLIENT', this.client)
            console.log('FETCH_COMMENT_CLIENT_QUERY', this.client.query)
            const response = await this.client.query<FetchCommentsQuery>({
                query: FetchCommentsDocument,
            })

            console.log('RESPONSE', response)

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
