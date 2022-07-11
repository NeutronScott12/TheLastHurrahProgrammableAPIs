import React, { useContext } from 'react'
import { CommentQueries } from '@thelasthurrah/comment_api'

import {
    CommentAPIProvider,
    ICommentProvider,
} from '../common/BinaryStashProvider'

export function useBinaryCommentQueries(): CommentQueries {
    const client = useContext(CommentAPIProvider) as ICommentProvider

    // console.log('USE_BINARY_COMMENT_QUERIES : CLIENT', client)

    return client.queries
}
