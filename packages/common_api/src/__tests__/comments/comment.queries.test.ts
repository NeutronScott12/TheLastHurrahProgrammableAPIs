import { BinaryStashClient } from '../../BinaryStashClient'

describe('Comment Queries Test', () => {
    let binaryStashClient: BinaryStashClient

    beforeEach(() => {
        binaryStashClient = new BinaryStashClient({
            http_uri: 'http://localhost:4000/graphql',
            ws_uri: 'ws://localhost:4003/graphql',
            application_short_name: 'first-application',
        })
    })

    it('Fetch Comments', async () => {
        const result = await binaryStashClient.comment_queries.fetch_comemnts()

        console.log('FETCH_COMMENTS', result)

        expect(result).toBeDefined()
    })
})
