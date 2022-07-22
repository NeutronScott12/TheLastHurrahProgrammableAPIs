import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client'

export interface IAuthenticationAPI {
    application_short_name: string
    client: ApolloClient<NormalizedCacheObject>
    cache: InMemoryCache
    changeToken: (token: string) => void
}

export class BinaryStashClient {
    http_uri: string
    ws_uri: string | null
    application_short_name: string
    token: string
    cache: InMemoryCache
    client: ApolloClient<NormalizedCacheObject>
    comment_queries: CommentQueries
    comment_mutations: CommentMutations
    authentication_queries: AuthenticationQueries
    authentication_mutations: AuthenticationMutations
    constructor({
        http_uri,
        ws_uri,
        application_short_name,
        cache,
    }: IBinaryStashClientArgs)
}
