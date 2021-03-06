import { InMemoryCache } from '@apollo/client'

import { faker } from '@faker-js/faker'

import { AuthenticationMutations } from '../index'
import { AuthenticationAPI } from '../../AuthenticationAPI'

describe('Authentication Tests', () => {
    let mutations: AuthenticationMutations
    let email: string
    let username: string
    let password: string

    beforeAll(() => {
        const authApi = new AuthenticationAPI(
            'http://localhost:4000/graphql',
            'first-application',
        )

        email = faker.internet.email()
        username = faker.internet.userName()
        password = faker.internet.password()

        const cache = new InMemoryCache()

        mutations = authApi.mutations
    })

    it('Register', async () => {
        const result = await mutations.register({
            email,
            password,
            username,
            two_factor_authentication: false,
            repeat_password: password,
        })

        if (result && result.data) {
            const { success } = result.data?.register_user

            expect(success).toBeTruthy()
        }

        expect(result).toBeDefined()
    })

    it('Login', async () => {
        const result = await mutations.login({
            email,
            password,
        })

        if (result && result.data) {
            const { success } = result.data?.login_user

            expect(success).toBeTruthy()
        }

        expect(result).toBeDefined()
    })

    it('Forgot password', async () => {
        const result = await mutations.forgot_password({
            email,
            redirect_url: '',
        })

        if (result && result.data) {
            const { success } = result.data?.forgot_password

            expect(success).toBeTruthy()
        }

        expect(result).toBeDefined()
    })

    it('change password', async () => {
        const result = await mutations.change_password({
            email,
            password: 'new password',
        })

        if (result && result.data) {
            const { success } = result.data.change_password

            expect(success).toBeTruthy()
        }

        expect(result).toBeDefined()
    })

    // it('failed two factor login', async () => {
    //     const result = await mutations.two_factor_login({
    //         email,
    //         two_factor_id: '123',
    //     })

    //     // expect(result).toBeDefined()
    // })

    afterAll(async () => {
        const result = await mutations.delete_user({ email })

        expect(result.data?.delete_user.success).toBeTruthy()
    })
})
