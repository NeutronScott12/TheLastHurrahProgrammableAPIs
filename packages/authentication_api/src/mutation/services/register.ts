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
        const { client, application_short_name } = global

        const newArgs = omit(['repeat_password'], args)

        console.log('APPLICATION_SHORT_NAME', application_short_name)
        console.log('ARGUMENTS', args)
        // console.log('CLIENT', client)

        return client.mutate<
            RegistrationMutation,
            RegistrationMutationVariables
        >({
            mutation: RegistrationDocument,
            variables: {
                registrationInput: {
                    ...newArgs,
                    application_short_name,
                },
            },
        })
    } catch (error) {
        throw new Error(`Error ${error}`)
    }
}
