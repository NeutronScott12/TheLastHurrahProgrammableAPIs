import {
    ApolloClient,
    ApolloLink,
    createHttpLink,
    InMemoryCache,
    NormalizedCacheObject,
    split,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { setContext } from '@apollo/client/link/context'
import { isBrowser } from 'browser-or-node'
import fetch from 'cross-fetch'
import { getMainDefinition } from '@apollo/client/utilities'
import {
    CommentMutations,
    CommentQueries,
    Sort,
} from '@thelasthurrah/comment_api'
import {
    AuthenticationMutations,
    AuthenticationQueries,
} from '@thelasthurrah/authentication_api'

const TEST_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzE1N2YzZGItM2E3OS00M2UwLWEzZmUtMDc2OGExZGM4NmJiIiwidXNlcm5hbWUiOiJzY290dCIsImVtYWlsIjoic2NvdHRiZXJyeTkxQGdtYWlsLmNvbSIsImNvbmZpcm1lZCI6dHJ1ZSwiYXBwbGljYXRpb25faWQiOiI2MDY0ZWIwYy0wOGM5LTRkZWEtODdlNy04OTU3NGEyMTA2NDQiLCJpYXQiOjE2NTYwMTA1OTAsImV4cCI6MTY1NjYxNTM5MH0.zZdkSHivj7xCTRVbZE-pjnHcuW1Jb_o2AGVuAamVMMI'

interface IBinaryStashClientArgs {
    http_uri: string
    ws_uri: string | null
    application_short_name: string
    cache?: InMemoryCache
}

export class BinaryStashClient {
    private http_uri: string
    private ws_uri: string | null
    private application_short_name: string
    private token: string | null = null
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
    }: IBinaryStashClientArgs) {
        this.http_uri = http_uri
        this.ws_uri = ws_uri || null
        this.application_short_name = application_short_name
        this.cache = cache!

        this.bootstrap()
    }

    private generateClient() {
        let httpLink: ApolloLink
        let wsLink: WebSocketLink

        if (isBrowser) {
            this.token = localStorage.getItem('binary-stash-token')
        } else {
            this.token = TEST_TOKEN
        }

        if (!this.cache) {
            this.cache = new InMemoryCache()
        }

        if (!this.token && !isBrowser) {
            throw new Error('Remember the token you daft cunt')
        }

        if (isBrowser) {
            httpLink = createHttpLink({
                uri: this.http_uri,
            })

            if (this.ws_uri) {
                wsLink = new WebSocketLink({
                    uri: this.ws_uri,
                    options: {
                        reconnect: true,
                        connectionParams: {
                            Authorization: `Bearer ${this.token}`,
                        },
                    },
                })
            }
        } else {
            try {
                // let ws = await import('ws')
                httpLink = createHttpLink({
                    uri: this.http_uri,
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
                    Authorization: `Bearer ${this.token}`,
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

            console.log('BINARY STASH CLIENT STARTING')

            this.client = new ApolloClient({
                link: splitLink,
                cache: this.cache,
            })
        } else {
            console.log('BINARY STASH CLIENT STARTING (NO WEBSOCKET)')
            this.client = new ApolloClient({
                link: authHttpLink,
                // link: splitLink,
                cache: this.cache,
            })
        }
    }

    private bootstrap() {
        console.log('BOOTSTRAPPING BINARY STASH CLIENT')

        this.generateClient()
        // this.comment_queries = new CommentQueries(this.client)
        // this.comment_mutations = new CommentMutations({
        //     application_short_name: this.application_short_name,
        //     cache: this.cache,
        //     client: this.client,
        //     limit: 10,
        //     skip: 0,
        //     sort: Sort.Asc,
        // })
        this.authentication_queries = new AuthenticationQueries(this.client)
        this.authentication_mutations = new AuthenticationMutations({
            client: this.client,
            application_short_name: this.application_short_name,
            cache: this.cache,
        })
    }
}

const binaryStashClient = new BinaryStashClient({
    http_uri: 'http://localhost:4000/graphql',
    ws_uri: 'ws://localhost:4003/graphql',
    application_short_name: 'first-application',
})

binaryStashClient.comment_queries
    .fetch_comemnts()
    .then(console.log)
    .catch(console.error)
