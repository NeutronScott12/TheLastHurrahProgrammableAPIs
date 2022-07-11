import React, { useContext } from 'react'
import { CommentQueries } from '@thelasthurrah/comment_api'

import {
    CommentAPIProvider,
    IBinaryStashProvider,
} from '../common/BinaryStashProvider'
import { BinaryStashClient } from '../../BinaryStashClient'

export function useBinaryCommentQueries(): CommentQueries {
    const context = useContext(CommentAPIProvider) as BinaryStashClient

    // console.log('USE_BINARY_COMMENT_QUERIES : context', context)

    return context.comment_queries
}
