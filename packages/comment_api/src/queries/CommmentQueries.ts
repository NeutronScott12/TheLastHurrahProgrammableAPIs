import {
    ApolloClient,
    ApolloError,
    ApolloQueryResult,
    NormalizedCacheObject,
} from '@apollo/client'
import {
    FetchCommentByThreadIdQuery,
    FetchCommentByThreadIdDocument,
    FetchCommentByThreadIdQueryVariables,
    Sort,
} from '../generated/graphql'
import { FetchCommentByThreadId } from './types'

interface ICommentQueriesArgs {
    client: ApolloClient<NormalizedCacheObject>
    application_short_name: string
}

export class CommentQueries {
    client: ApolloClient<NormalizedCacheObject>
    application_short_name: string

    constructor({ client, application_short_name }: ICommentQueriesArgs) {
        this.client = client
        this.application_short_name = application_short_name
    }

    public async fetch_comemnts({
        limit = 10,
        skip = 0,
        sort = Sort.Desc,
        thread_id,
    }: FetchCommentByThreadId): Promise<
        ApolloQueryResult<FetchCommentByThreadIdQuery>
    > {
        try {
            const result = await this.client.query<
                FetchCommentByThreadIdQuery,
                FetchCommentByThreadIdQueryVariables
            >({
                query: FetchCommentByThreadIdDocument,
                variables: {
                    fetchCommentByThreadIdInput: {
                        application_short_name: this.application_short_name,
                        limit,
                        skip,
                        sort,
                        thread_id,
                    },
                },
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
