import {
    DeleteUserDocument,
    DeleteUserMutation,
    DeleteUserMutationVariables,
} from '../../generated/graphql'
import { IAuthenticationAPI } from '../../types'
import { IDeleteUserArgs } from '../types'

export const delete_user = async (
    args: IDeleteUserArgs,
    global: IAuthenticationAPI,
) => {
    try {
        const { client } = global

        return client.mutate<DeleteUserMutation, DeleteUserMutationVariables>({
            mutation: DeleteUserDocument,
            variables: {
                deleteUserInput: {
                    ...args,
                },
            },
        })
    } catch (error) {
        throw new Error()
    }
}
