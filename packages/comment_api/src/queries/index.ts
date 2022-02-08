import {
    ApolloClient,
    ApolloError,
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
            // console.log('CLIENT', this.client)
            const response = await this.client.query<FetchCommentsQuery>({
                query: FetchCommentsDocument,
            })

            // console.log('RESPONSE', response)

            return response.data
        } catch (error) {
            if (error instanceof ApolloError) {
                throw new ApolloError(error)
            }

            throw new Error(
                `Something really bad happened at fetch_comments - ${error}`,
            )
        }
    }
}
