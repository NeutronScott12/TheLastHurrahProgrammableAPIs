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
            const response = await this.client.query<FetchCommentsQuery>({
                query: FetchCommentsDocument,
            })

            return response.data
        } catch (error) {
            if (error instanceof ApolloError) {
                throw new ApolloError(error)
            }

            throw new Error('Something really bad happened at fetch_commentss')
        }
    }
}
