import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client'

export interface IAuthenticationAPI {
    client: ApolloClient<NormalizedCacheObject>
    cache: InMemoryCache
}
