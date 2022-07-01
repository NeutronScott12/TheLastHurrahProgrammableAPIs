import { BinaryStashClient } from '../../BinaryStashClient'

describe('BinaryStashClient API Authentication Test', () => {
    let binaryStashClient: BinaryStashClient

    beforeEach(() => {
        binaryStashClient = new BinaryStashClient({
            http_uri: 'http://localhost:4000/graphql',
            ws_uri: 'ws://localhost:4003/graphql',
            application_short_name: 'first-application',
        })
    })

    it('Fetch Current User', async () => {
        console.log(
            'BINARYSTASHCLIENT',
            binaryStashClient.authentication_queries,
        )

        const user =
            await binaryStashClient.authentication_queries.currentUser()

        console.log('USER', user)

        expect(user).toBeDefined()
    })
})
