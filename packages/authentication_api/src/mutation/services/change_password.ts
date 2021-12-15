import { IAuthenticationAPI } from '../../types'
import { IChangePasswordArgs } from '../types'
import {
    ChangePasswordDocument,
    ChangePasswordMutation,
    ChangePasswordMutationVariables,
} from '../../generated/graphql'

export const change_password = async (
    args: IChangePasswordArgs,
    global: IAuthenticationAPI,
) => {
    try {
        const { client } = global

        return client.mutate<
            ChangePasswordMutation,
            ChangePasswordMutationVariables
        >({
            mutation: ChangePasswordDocument,
            variables: {
                changePasswordInput: {
                    ...args,
                },
            },
        })
    } catch (error) {
        throw new Error()
    }
}
