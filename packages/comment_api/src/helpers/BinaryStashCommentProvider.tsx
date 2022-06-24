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

export const BinaryCommentProvider: React.FC<IBinaryStashProvider> = ({
    children,
    client,
}) => {
    return (
        <CommentAPIProvider.Provider value={client}>
            {children}
        </CommentAPIProvider.Provider>
    )
}
