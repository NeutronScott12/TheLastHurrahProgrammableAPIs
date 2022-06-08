import React, { useContext } from 'react'
import { AuthenticationMutations } from '../mutation'
import {
    AuthenticationAPIProvider,
    IAuthenticationProvider,
} from './BinaryStashAuthProvider'

export const useBinaryMutations = (): AuthenticationMutations => {
    const client = useContext(
        AuthenticationAPIProvider,
    ) as IAuthenticationProvider

    // console.log('CLIENT', client)

    return client.mutations
}
