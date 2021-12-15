require('dotenv').config()

import { ApolloClient, createHttpLink, split } from '@apollo/client/core'
import { NormalizedCacheObject, InMemoryCache } from '@apollo/client/cache'
import { setContext } from '@apollo/client/link/context'
import fetch from 'cross-fetch'
// import { getMainDefinition } from '@apollo/client/utilities'
// import { WebSocketLink } from '@apollo/client/link/ws'
import { isBrowser } from 'browser-or-node'
// import ws from 'ws'

import { AuthenticationQueries } from './queries'

export class AuthenticationAPI {
    public client: ApolloClient<NormalizedCacheObject>
    cache: InMemoryCache
    application_short_name: string
    queries: AuthenticationQueries

    constructor(
        uri: string,
        application_short_name: string,
        cache?: InMemoryCache,
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
            token = process.env.JSON_TOKEN as string
        }

        if (!token) {
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
    }
}
