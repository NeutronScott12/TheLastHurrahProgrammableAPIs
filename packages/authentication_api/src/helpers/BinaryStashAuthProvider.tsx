import React, { createContext } from 'react'
import { AuthenticationAPI } from '../AuthenticationAPI'
import { AuthenticationMutations } from '../mutation'
import { AuthenticationQueries } from '../queries'

interface IBinaryStashProvider {
    children?: React.ReactNode
    client: AuthenticationAPI
}

export interface IAuthenticationProvider {
    mutations: AuthenticationMutations
    queries: AuthenticationQueries
}

export const AuthenticationAPIProvider = createContext({})

export const BinaryStashProvider: React.FC<IBinaryStashProvider> = ({
    children,
    client,
}) => {
    return (
        <AuthenticationAPIProvider.Provider value={client}>
            {children}
        </AuthenticationAPIProvider.Provider>
    )
}
