// require('dotenv').config()

import {
    ApolloClient,
    ApolloLink,
    createHttpLink,
    split,
} from '@apollo/client/core'
import { NormalizedCacheObject, InMemoryCache } from '@apollo/client/cache'
import { setContext } from '@apollo/client/link/context'
import fetch from 'cross-fetch'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import { isBrowser } from 'browser-or-node'

import { CommentQueries } from './queries'
import { CommentMutations } from './mutations'
import { Sort } from './generated/graphql'

export class CommentAPI {
    public client: ApolloClient<NormalizedCacheObject>
    cache: InMemoryCache
    queries: CommentQueries
    mutations: CommentMutations
    application_short_name: string

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
        const subUri =
            process.env.NODE_ENV === 'production'
                ? 'wss://lasthurrah.co.uk/ws-graphql'
                : 'ws://localhost:4003/graphql'
        let httpLink: ApolloLink
        let wsLink: WebSocketLink

        if (!cache) {
            this.cache = new InMemoryCache({})
        } else {
            this.cache = cache
        }

        if (isBrowser) {
            token = localStorage.getItem('binary-stash-token')

            httpLink = httpLink = createHttpLink({
                uri,
            })

            wsLink = new WebSocketLink({
                uri: subUri,
                options: {
                    reconnect: true,
                    connectionParams: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            })
        } else {
            token = process.env.JSON_TOKEN as string
            try {
                // let ws = await import('ws')
                httpLink = createHttpLink({
                    uri,
                    fetch,
                })
                // wsLink = new WebSocketLink({
                //     webSocketImpl: ws,
                //     uri: subUri,
                //     options: {
                //         reconnect: true,
                //         connectionParams: {
                //             Authorization: `Bearer ${token}`,
                //         },
                //     },
                // })
            } catch (error) {
                throw Error(
                    'Something went wrong with websocket implementation',
                )
            }
        }

        if (!token) {
            throw new Error('Token is required')
        }

        const authLink = setContext((_, { headers }) => {
            return {
                headers: {
                    ...headers,
                    authorization: 'token' ? `Bearer ${token}` : '',
                },
            }
        })

        const authHttpLink = authLink.concat(httpLink)

        if (isBrowser) {
            const splitLink = split(
                ({ query }) => {
                    const definition = getMainDefinition(query)
                    return (
                        definition.kind === 'OperationDefinition' &&
                        definition.operation === 'subscription'
                    )
                },
                // wsLink,
                authHttpLink,
            )

            this.client = new ApolloClient({
                // link: authHttpLink,
                link: splitLink,
                cache: this.cache,
            })
        } else {
            this.client = new ApolloClient({
                link: authHttpLink,
                // link: splitLink,
                cache: this.cache,
            })
        }

        // console.log('BUILDING CLIENT', this.client)
    }

    private bootstrap() {
        this.queries = new CommentQueries(this.client)
        this.mutations = new CommentMutations({
            application_short_name: this.application_short_name,
            cache: this.cache,
            client: this.client,
            limit: 10,
            skip: 0,
            sort: Sort.Asc,
        })
    }
}

const commentApi = new CommentAPI(
    'http://localhost:4000/graphql',
    'first-application',
)

// commentApi.queries
//     .fetch_comemnts()
//     .then((data) => {
//         console.log('COMMENTS', JSON.stringify(data, null, 2))
//     })
//     .catch(console.error)
