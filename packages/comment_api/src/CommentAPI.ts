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

interface ICommentAPIArgs {
    http_uri: string
    web_socket_uri: string
    application_short_name: string
    cache?: InMemoryCache
}

const TEST_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzE1N2YzZGItM2E3OS00M2UwLWEzZmUtMDc2OGExZGM4NmJiIiwidXNlcm5hbWUiOiJzY290dCIsImVtYWlsIjoic2NvdHRiZXJyeTkxQGdtYWlsLmNvbSIsImNvbmZpcm1lZCI6dHJ1ZSwiYXBwbGljYXRpb25faWQiOiI2MDY0ZWIwYy0wOGM5LTRkZWEtODdlNy04OTU3NGEyMTA2NDQiLCJpYXQiOjE2NTYwMTA1OTAsImV4cCI6MTY1NjYxNTM5MH0.zZdkSHivj7xCTRVbZE-pjnHcuW1Jb_o2AGVuAamVMMI'

export class CommentAPI {
    private static instance: CommentAPI

    public client: ApolloClient<NormalizedCacheObject>
    public queries: CommentQueries
    public mutations: CommentMutations
    cache: InMemoryCache
    application_short_name: string
    webSocketUrl: string
    token: string | null

    constructor({
        http_uri,
        web_socket_uri,
        application_short_name,
        cache,
    }: ICommentAPIArgs) {
        this.application_short_name = application_short_name
        this.webSocketUrl = web_socket_uri
        this.generateClient(http_uri, cache!)
        this.bootstrap()
    }

    private generateClient(uri: string, cache: InMemoryCache) {
        const subUri = this.webSocketUrl

        console.log('SUB_URI', subUri)

        let httpLink: ApolloLink
        let wsLink: WebSocketLink

        if (isBrowser) {
            this.token = localStorage.getItem('binary-stash-token')
        } else {
            this.token = TEST_TOKEN
        }

        if (!cache) {
            this.cache = new InMemoryCache({})
        } else {
            this.cache = cache
        }

        if (!this.token && !isBrowser) {
            throw new Error('Token is required')
        }

        if (isBrowser) {
            httpLink = createHttpLink({
                uri,
            })

            wsLink = new WebSocketLink({
                uri: subUri,
                options: {
                    reconnect: true,
                    connectionParams: {
                        Authorization: `Bearer ${this.token}`,
                    },
                },
            })
        } else {
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

        const authLink = setContext((_, { headers }) => {
            return {
                headers: {
                    ...headers,
                    authorization: 'token' ? `Bearer ${this.token}` : '',
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

            console.log('CLIENT BROWSER STARTING')

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
        console.log('BOOTSTRAPING COMMENT API CLIENT', this.client)
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

    public static getInstance(): CommentAPI {
        if (!CommentAPI.instance) {
            CommentAPI.instance = new CommentAPI({
                http_uri: 'http://localhost:4000/graphql',
                web_socket_uri: 'ws://localhost:4003/graphql',
                application_short_name: 'first-application',
            })
        }
        return CommentAPI.instance
    }
}

// const commentApi = new CommentAPI({
//     http_uri: 'http://localhost:4000/graphql',
//     web_socket_uri: 'ws://localhost:4003/graphql',
//     application_short_name: 'first-application',
// })

// commentApi.queries
//     .fetch_comemnts()
//     .then((data) => {
//         console.log('COMMENTS', JSON.stringify(data, null, 2))
//     })
//     .catch(console.error)
