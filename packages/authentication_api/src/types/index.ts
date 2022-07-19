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
