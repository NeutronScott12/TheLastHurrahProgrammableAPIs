import React, { createContext } from 'react'
import { CommentAPI } from '../CommentAPI'
import { CommentMutations } from '../mutations'
import { CommentQueries } from '../queries'

interface IBinaryStashProvider {
    children?: React.ReactNode
    client: CommentAPI
}

export interface ICommentProvider {
    mutations: CommentMutations
    queries: CommentQueries
}

export const CommentAPIProvider = createContext({})

export function BinaryCommentProvider({
    children,
    client,
}: IBinaryStashProvider) {
    return (
        <CommentAPIProvider.Provider value={client}>
            {children}
        </CommentAPIProvider.Provider>
    )
}

// React.FC<IBinaryStashProvider>
