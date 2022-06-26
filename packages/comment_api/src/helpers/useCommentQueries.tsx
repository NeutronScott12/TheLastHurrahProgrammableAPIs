import React, { useContext } from 'react'
import { CommentQueries } from '../queries'

import {
    CommentAPIProvider,
    ICommentProvider,
} from './BinaryStashCommentProvider'

export function useBinaryCommentQueries(): CommentQueries {
    const client = useContext(CommentAPIProvider) as ICommentProvider

    console.log('USE_BINARY_COMMENT_QUERIES : CLIENT', client)

    return client.queries
}
