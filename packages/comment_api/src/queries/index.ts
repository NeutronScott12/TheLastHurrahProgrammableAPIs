import {
    ApolloClient,
    ApolloError,
    NormalizedCacheObject,
} from '@apollo/client'
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
            const result = await this.client.query<FetchCommentsQuery>({
                query: FetchCommentsDocument,
            })

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
