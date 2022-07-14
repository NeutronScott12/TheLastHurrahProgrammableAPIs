// import { ApolloProvider } from '@apollo/client'
// import {
//     AuthenticationMutations,
//     AuthenticationQueries,
// } from '@thelasthurrah/authentication_api'
// import { CommentMutations, CommentQueries } from '@thelasthurrah/comment_api'
import React, { createContext } from 'react'
import { BinaryStashClient } from '../../BinaryStashClient'

export interface IBinaryStashProvider {
    children?: React.ReactNode
    binaryStashClient: BinaryStashClient
}

export interface IBinaryStashContext {
    client: BinaryStashClient
}

export const CommentAPIProvider = createContext({})

export const AuthAPIProvider = createContext({})

export function BinaryStashProvider({
    children,
    binaryStashClient,
}: IBinaryStashProvider) {
    return (
        // <ApolloProvider client={binaryStashClient.client}>
        <AuthAPIProvider.Provider value={binaryStashClient}>
            <CommentAPIProvider.Provider value={binaryStashClient}>
                {children}
            </CommentAPIProvider.Provider>
        </AuthAPIProvider.Provider>
        // </ApolloProvider>
    )
}

// React.FC<IBinaryStashProvider>
