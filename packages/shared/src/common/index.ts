import { createContext } from 'react'

export interface IBinaryStashProvider {
    children?: React.ReactNode
    binaryStashClient: BinaryStashClient
}

export interface IBinaryStashContext {
    client: BinaryStashClient
}

export const CommentAPIProvider = createContext({})

export const AuthAPIProvider = createContext({})
