import { ApolloClient, createHttpLink } from '@apollo/client/core'
import { NormalizedCacheObject, InMemoryCache } from '@apollo/client/cache'
import fetch from 'cross-fetch'
import { CommentQueries } from './queries'

export class CommentAPI {
    private client: ApolloClient<NormalizedCacheObject>
    cache: InMemoryCache
    queries: CommentQueries
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
        if (!cache) {
            this.cache = new InMemoryCache({})
        } else {
            this.cache = cache
        }

        const httpLink = createHttpLink({
            uri,
            fetch,
        })

        this.client = new ApolloClient({
            link: httpLink,
            cache: this.cache,
        })
    }

    private bootstrap() {
        this.queries = new CommentQueries(this.client)
    }
}

const commentApi = new CommentAPI(
    'http://localhost:4000/graphql',
    'first-application',
)

commentApi.queries
    .fetch_comemnts()
    .then((data) => {
        console.log('COMMENTS', JSON.stringify(data, null, 2))
    })
    .catch(console.error)
