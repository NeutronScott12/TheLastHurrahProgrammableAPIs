import React, { useContext } from 'react'
import { CommentQueries } from '../queries'

import {
    CommentAPIProvider,
    ICommentProvider,
} from './BinaryStashCommentProvider'

export const useBinaryCommentMutations = (): CommentQueries => {
    const client = useContext(CommentAPIProvider) as ICommentProvider

    // console.log('CLIENT', client)

    return client.queries
}
