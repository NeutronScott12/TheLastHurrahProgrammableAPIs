import { AuthenticationQueries } from '..'
import { AuthenticationAPI } from '../..'

describe('Queries Tests', () => {
    let queries: AuthenticationQueries

    beforeAll(() => {
        const authApi = new AuthenticationAPI(
            'http://localhost:4000/graphql',
            'first-application',
        )

        queries = new AuthenticationQueries(authApi.client)
    })

    it('Auth API is defined', () => {
        expect(queries).toBeDefined()
    })

    // it('Current User', async () => {
    //     const result = await queries.currentUser()

    //     console.log('RESULT', result)

    //     const { id, username } = result.data.current_user

    //     expect(result).toBeDefined()
    //     expect(id).toBeDefined()
    //     expect(username).toBeDefined
    // })

    afterAll(() => {
        queries.client.stop()
    })
})
