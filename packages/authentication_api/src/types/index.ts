import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client'
import { AuthenticationMutations } from '../mutation'
import { AuthenticationQueries } from '../queries'

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
    authentication_queries: AuthenticationQueries
    authentication_mutations: AuthenticationMutations
}
