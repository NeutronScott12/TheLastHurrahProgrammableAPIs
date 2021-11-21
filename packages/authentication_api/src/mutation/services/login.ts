import {
    LoginDocument,
    LoginMutation,
    LoginMutationVariables,
} from '../../generated/graphql'
import { IAuthenticationAPI } from '../../types'
import { ILoginArgs } from '../types'

export const login = async (args: ILoginArgs, global: IAuthenticationAPI) => {
    try {
        const { client } = global
        const { email, password } = args

        return client.mutate<LoginMutation, LoginMutationVariables>({
            mutation: LoginDocument,
            variables: {
                loginInput: {
                    password,
                    email,
                },
            },
        })
    } catch (error) {
        throw new Error()
    }
}
