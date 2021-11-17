import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { FetchAllComments, FetchCommentsDocument } from '../generated/graphql'
import { CommentAPIErrors } from '../helpers/errors'

export class CommentQueries {
    client: ApolloClient<NormalizedCacheObject>

    constructor(client: ApolloClient<NormalizedCacheObject>) {
        this.client = client
    }

    public async fetch_comemnts(): Promise<
        FetchAllComments | CommentAPIErrors
    > {
        try {
            const response = await this.client.query<FetchAllComments>({
                query: FetchCommentsDocument,
            })

            return response.data
        } catch (error: unknown) {
            console.log('ERROR', error)
            return error as CommentAPIErrors
        }
    }
}
