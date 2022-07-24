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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzE1N2YzZGItM2E3OS00M2UwLWEzZmUtMDc2OGExZGM4NmJiIiwidXNlcm5hbWUiOiJzY290dCIsImVtYWlsIjoic2NvdHRiZXJyeTkxQGdtYWlsLmNvbSIsImNvbmZpcm1lZCI6dHJ1ZSwiaWF0IjoxNjU3NzIwNzI2LCJleHAiOjE2NTgzMjU1MjZ9.RxgeTpQXeKWOAP88ArYrOgoeRr4zFQgbfH8CQUvsZm8'

interface IBinaryStashClientArgs {
    http_uri: string
    ws_uri: string | null
    application_short_name: string
    cache?: InMemoryCache
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
    }: IBinaryStashClientArgs) {
        this.http_uri = http_uri
        this.ws_uri = ws_uri || null
        this.application_short_name = application_short_name
        this.cache = cache!

        this.bootstrap()
    }

    private generateClient() {
        if (isBrowser) {
            this.token = localStorage.getItem('binary-stash-token') || ''
        } else {
            this.token = TEST_TOKEN
        }

        if (!this.token && !isBrowser) {
            throw new Error('Token is required')
        }

        if (!this.cache) {
            this.cache = new InMemoryCache({})
        }

        const httpLink = createHttpLink({
            uri: this.http_uri,
            fetch,
        })

        const authLink = setContext((_, { headers }) => {
            return {
                headers: {
                    ...headers,
                    authorization: 'token' ? `Bearer ${this.token}` : '',
                },
            }
        })

        let wsLink: WebSocketLink | undefined = undefined

        if (isBrowser && this.ws_uri) {
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

        const authHttpLink = authLink.concat(httpLink)
        let splitLink: ApolloLink | undefined = undefined

        if (isBrowser) {
            if (wsLink) {
                splitLink = split(
                    ({ query }) => {
                        const definition = getMainDefinition(query)
                        return (
                            definition.kind === 'OperationDefinition' &&
                            definition.operation === 'subscription'
                        )
                    },
                    wsLink,
                    authHttpLink,
                )
            } else {
                splitLink = split(({ query }) => {
                    const definition = getMainDefinition(query)
                    return (
                        definition.kind === 'OperationDefinition' &&
                        definition.operation === 'subscription'
                    )
                }, authHttpLink)
            }
        }

        this.client = new ApolloClient({
            link: splitLink !== undefined ? splitLink : authHttpLink,
            cache: this.cache,
        })
    }

    private changeToken(token: string) {
        this.token = token
        this.bootstrap()
    }

    private bootstrap() {
        this.generateClient()

        this.comment_queries = new CommentQueries({
            client: this.client,
            application_short_name: this.application_short_name,
        })
        this.comment_mutations = new CommentMutations({
            application_short_name: this.application_short_name,
            cache: this.cache,
            client: this.client,
            limit: 10,
            skip: 0,
            sort: Sort.Asc,
        })
        this.authentication_queries = new AuthenticationQueries(this.client)
        this.authentication_mutations = new AuthenticationMutations({
            client: this.client,
            application_short_name: this.application_short_name,
            cache: this.cache,
            changeToken: this.changeToken.bind(this),
        })
    }
}
