import { omit } from 'ramda'
import {
    RegistrationDocument,
    RegistrationMutation,
    RegistrationMutationVariables,
} from '../../generated/graphql'
import { IAuthenticationAPI } from '../../types'
import { IRegisterArgs } from '../types'

export const regsiter = (args: IRegisterArgs, global: IAuthenticationAPI) => {
    try {
        const { client } = global

        const newArgs = omit(['repeat_password'], args)

        return client.mutate<
            RegistrationMutation,
            RegistrationMutationVariables
        >({
            mutation: RegistrationDocument,
            variables: {
                registrationInput: {
                    ...newArgs,
                },
            },
        })
    } catch (error) {
        throw new Error()
    }
}
