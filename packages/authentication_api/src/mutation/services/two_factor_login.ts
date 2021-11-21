import {
    TwoFactorLoginDocument,
    TwoFactorLoginMutation,
    TwoFactorLoginMutationVariables,
} from '../../generated/graphql'
import { IAuthenticationAPI } from '../../types'
import { ITwoFactorLogin } from '../types'

export const two_factor_login = async (
    args: ITwoFactorLogin,
    global: IAuthenticationAPI,
) => {
    try {
        const { client } = global

        return client.mutate<
            TwoFactorLoginMutation,
            TwoFactorLoginMutationVariables
        >({
            mutation: TwoFactorLoginDocument,
            variables: {
                twoFactorInput: {
                    ...args,
                },
            },
        })
    } catch (error) {
        throw new Error()
    }
}
