import {
    AuthenticationMutations,
    AuthenticationQueries,
} from '@thelasthurrah/authentication_api'
import { CommentMutations, CommentQueries } from '@thelasthurrah/comment_api'
import React, { createContext } from 'react'
import { BinaryStashClient } from '../../BinaryStashClient'

export interface IBinaryStashProvider {
    children?: React.ReactNode
    client: BinaryStashClient
}

export interface IBinaryStashContext {
    client: BinaryStashClient
}

export const CommentAPIProvider = createContext({})

export const AuthAPIProvider = createContext({})

export function BinaryStashProvider({
    children,
    client,
}: IBinaryStashProvider) {
    return (
        <AuthAPIProvider.Provider value={client}>
            <CommentAPIProvider.Provider value={client}>
                {children}
            </CommentAPIProvider.Provider>
        </AuthAPIProvider.Provider>
    )
}

// React.FC<IBinaryStashProvider>
