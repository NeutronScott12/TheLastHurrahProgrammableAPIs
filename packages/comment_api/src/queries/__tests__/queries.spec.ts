import { CommentQueries } from '..'
import { CommentAPI } from '../..'

describe('Queries Tests', () => {
    let queries: CommentQueries
    let commentApi: CommentAPI

    beforeAll(() => {
        commentApi = new CommentAPI(
            'http://localhost:4000/graphql',
            'first-application',
        )

        queries = new CommentQueries(commentApi.client)
    })

    it('Fetch Comments', async () => {
        const result = await queries.fetch_comemnts()

        if (result && result.fetch_comments) {
            const { comments, comments_count } = result.fetch_comments

            expect(comments).toBeTruthy()
            expect(comments_count).toEqual(expect.any(Number))
        }

        expect(result).toBeDefined()
    })
})
