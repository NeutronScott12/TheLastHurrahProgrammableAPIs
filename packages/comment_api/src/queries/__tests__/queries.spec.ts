import { CommentQueries } from '..'
import { CommentAPI } from '../..'
import { ThreadModel } from '../../generated/graphql'

describe('Queries Tests', () => {
    let commentApi: CommentAPI
    let thread: any

    let thread_id: string

    beforeAll(async () => {
        commentApi = new CommentAPI({
            http_uri: 'http://localhost:4000/graphql',
            web_socket_uri: 'ws://localhost:4003/graphql',
            application_short_name: 'first-application',
        })

        thread = await commentApi.mutations.findOneOrCreateOneThread({
            application_id: '6064eb0c-08c9-4dea-87e7-89574a210644',
            title: 'practice title',
            website_url: 'localhost:3000',
        })

        thread_id = thread.data.find_one_thread_or_create_one.id
    })

    it('Fetch Comments', async () => {
        const result = await commentApi.queries.fetch_comemnts({
            limit: 10,
            skip: 0,
            thread_id,
        })

        if (result && result.data.fetch_comments_by_thread_id) {
            const { comments, comments_count } =
                result.data.fetch_comments_by_thread_id

            expect(comments).toBeTruthy()

            expect(comments_count).toEqual(expect.any(Number))
        }

        expect(result).toBeDefined()
    })
})
