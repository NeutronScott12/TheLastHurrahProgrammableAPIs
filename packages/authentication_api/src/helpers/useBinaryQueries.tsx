import React, { useContext } from 'react'
import { AuthenticationQueries } from '../queries'
import {
    AuthenticationAPIProvider,
    IAuthenticationProvider,
} from './BinaryStashAuthProvider'

export const useBinaryQueries = (): AuthenticationQueries => {
    const client = useContext(
        AuthenticationAPIProvider,
    ) as IAuthenticationProvider

    // console.log('CLIENT', client)

    return client.queries
}
