import { FetchResult } from '@apollo/client'
import {
    LoginDocument,
    LoginMutation,
    LoginMutationVariables,
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
        const { client, application_short_name, changeToken } = global
        const { email, password } = args

        const result = await client.mutate<
            LoginMutation,
            LoginMutationVariables
        >({
            mutation: LoginDocument,
            variables: {
                loginInput: {
                    password,
                    email,
                    application_short_name,
                },
            },
        })

        if (changeToken && result.data?.login_user) {
            //@ts-ignore
            changeToken(result.data.login_user.token)
        }

        return result
    } catch (error) {
        throw new Error()
    }
}
