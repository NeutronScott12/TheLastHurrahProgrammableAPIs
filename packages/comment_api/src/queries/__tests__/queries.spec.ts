import { CommentQueries } from '..'
import { CommentAPI } from '../..'

describe('Queries Tests', () => {
    let commentApi: CommentAPI

    beforeAll(() => {
        commentApi = new CommentAPI({
            http_uri: 'http://localhost:4000/graphql',
            web_socket_uri: 'ws://localhost:4003/graphql',
            application_short_name: 'first-application',
        })
    })

    it('Fetch Comments', async () => {
        const result = await commentApi.queries.fetch_comemnts()

        if (result && result.data.fetch_comments) {
            const { comments, comments_count } = result.data.fetch_comments

            expect(comments).toBeTruthy()
            expect(comments_count).toEqual(expect.any(Number))
        }

        expect(result).toBeDefined()
    })
})
