import {
    ForgotPasswordDocument,
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables,
} from '../../generated/graphql'
import { IAuthenticationAPI } from '../../types'
import { IForgotPasswordArgs } from '../types'

export const forgot_password = async (
    args: IForgotPasswordArgs,
    global: IAuthenticationAPI,
) => {
    try {
        const { client } = global

        return client.mutate<
            ForgotPasswordMutation,
            ForgotPasswordMutationVariables
        >({
            mutation: ForgotPasswordDocument,
            variables: {
                forgotPasswordInput: {
                    ...args,
                },
            },
        })
    } catch (error) {
        throw new Error()
    }
}
