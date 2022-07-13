import { BinaryStashClient } from '../../BinaryStashClient'

describe('Comment Queries Test', () => {
    let binaryStashClient: BinaryStashClient
    let thread: any
    let thread_id: string

    beforeEach(async () => {
        binaryStashClient = new BinaryStashClient({
            http_uri: 'http://localhost:4000/graphql',
            ws_uri: 'ws://localhost:4003/graphql',
            application_short_name: 'first-application',
        })

        thread =
            await binaryStashClient.comment_mutations.findOneOrCreateOneThread({
                application_id: '6064eb0c-08c9-4dea-87e7-89574a210644',
                title: 'practice title',
                website_url: 'localhost:3000',
            })

        thread_id = thread.data.find_one_thread_or_create_one.id
    })

    it('Fetch Comments', async () => {
        const result = await binaryStashClient.comment_queries.fetch_comemnts({
            thread_id,
        })

        console.log('FETCH_COMMENTS', result)

        expect(result).toBeDefined()
    })
})
