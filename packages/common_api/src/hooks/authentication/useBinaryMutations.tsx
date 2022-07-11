import {
    AuthenticationAPIProvider,
    AuthenticationMutations,
    IAuthenticationProvider,
} from '@thelasthurrah/authentication_api'
import React, { useContext } from 'react'

export const useBinaryMutations = (): AuthenticationMutations => {
    const client = useContext(
        AuthenticationAPIProvider,
    ) as IAuthenticationProvider

    // console.log('CLIENT', client)

    return client.mutations
}
