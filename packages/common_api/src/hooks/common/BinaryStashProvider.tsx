import { CommentMutations, CommentQueries } from '@thelasthurrah/comment_api'
import React, { createContext } from 'react'
import { BinaryStashClient } from '../../BinaryStashClient'

interface IBinaryStashProvider {
    children?: React.ReactNode
    client: BinaryStashClient
}

export interface ICommentProvider {
    mutations: CommentMutations
    queries: CommentQueries
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
