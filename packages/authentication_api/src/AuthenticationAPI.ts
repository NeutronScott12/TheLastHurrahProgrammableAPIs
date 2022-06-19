import { ApolloClient, createHttpLink } from '@apollo/client/core'
import { NormalizedCacheObject, InMemoryCache } from '@apollo/client/cache'
import { setContext } from '@apollo/client/link/context'
import fetch from 'cross-fetch'
import { isBrowser } from 'browser-or-node'

import { AuthenticationQueries } from './queries'
import { AuthenticationMutations } from './mutation'

const TEST_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzE1N2YzZGItM2E3OS00M2UwLWEzZmUtMDc2OGExZGM4NmJiIiwidXNlcm5hbWUiOiJzY290dCIsImVtYWlsIjoic2NvdHRiZXJyeTkxQGdtYWlsLmNvbSIsImNvbmZpcm1lZCI6dHJ1ZSwiaWF0IjoxNjU1NjQxMTA3LCJleHAiOjE2NTYyNDU5MDd9.kN6kitkak2kxCA-rtIkuEdV2vozBN-4E1DzD2Kb7TFs'

export class AuthenticationAPI {
    public client: ApolloClient<NormalizedCacheObject>
    cache: InMemoryCache
    application_short_name: string
    queries: AuthenticationQueries
    mutations: AuthenticationMutations

    constructor(
        uri: string,
        application_short_name: string,
        cache?: InMemoryCache,
        token_name?: string,
    ) {
        this.application_short_name = application_short_name
        this.generateClient(uri, cache!)
        this.bootstrap()
    }

    private generateClient(uri: string, cache: InMemoryCache) {
        let token: string | null

        if (isBrowser) {
            token = localStorage.getItem('binary-stash-token')
        } else {
            token = TEST_TOKEN
        }

        if (!token && !isBrowser) {
            throw new Error('Token is required')
        }

        if (!cache) {
            this.cache = new InMemoryCache({})
        } else {
            this.cache = cache
        }

        const httpLink = createHttpLink({
            uri,
            fetch,
        })

        const authLink = setContext((_, { headers }) => {
            return {
                headers: {
                    ...headers,
                    authorization: 'token' ? `Bearer ${token}` : '',
                },
            }
        })

        // const subUri =
        //     process.env.NODE_ENV === 'production'
        //         ? 'wss://lasthurrah.co.uk/ws-graphql'
        //         : 'ws://localhost:4003/graphql'

        // const wsLink = new WebSocketLink({
        //     webSocketImpl: ws,
        //     uri: subUri,
        //     options: {
        //         reconnect: true,
        //         connectionParams: {
        //             Authorization: `Bearer ${token}`,
        //         },
        //     },
        // })

        const authHttpLink = authLink.concat(httpLink)

        // const splitLink = split(
        //     ({ query }) => {
        //         const definition = getMainDefinition(query)
        //         return (
        //             definition.kind === 'OperationDefinition' &&
        //             definition.operation === 'subscription'
        //         )
        //     },
        //     wsLink,
        //     authHttpLink,
        // )

        this.client = new ApolloClient({
            link: authHttpLink,
            cache: this.cache,
        })
    }

    private bootstrap() {
        this.queries = new AuthenticationQueries(this.client)
        this.mutations = new AuthenticationMutations({
            application_short_name: this.application_short_name,
            client: this.client,
            cache: this.cache,
        })
    }
}
