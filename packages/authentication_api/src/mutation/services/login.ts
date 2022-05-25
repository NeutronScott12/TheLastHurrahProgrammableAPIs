import { FetchResult } from '@apollo/client'
import {
    LoginDocument,
    LoginMutation,
    LoginMutationVariables,
    LoginResponse,
} from '../../generated/graphql'
import { IAuthenticationAPI } from '../../types'
import { ILoginArgs } from '../types'

export const login = async (
    args: ILoginArgs,
    global: IAuthenticationAPI,
): Promise<
    FetchResult<LoginMutation, Record<string, any>, Record<string, any>>
> => {
    try {
        const { client, application_short_name } = global
        const { email, password } = args

        return client.mutate<LoginMutation, LoginMutationVariables>({
            mutation: LoginDocument,
            variables: {
                loginInput: {
                    password,
                    email,
                    application_short_name,
                },
            },
        })
    } catch (error) {
        throw new Error()
    }
}
