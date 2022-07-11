import {
    AuthenticationAPIProvider,
    AuthenticationQueries,
    IAuthenticationProvider,
} from '@thelasthurrah/authentication_api'
import React, { useContext } from 'react'

export const useBinaryQueries = (): AuthenticationQueries => {
    const client = useContext(
        AuthenticationAPIProvider,
    ) as IAuthenticationProvider

    // console.log('CLIENT', client)

    return client.queries
}
