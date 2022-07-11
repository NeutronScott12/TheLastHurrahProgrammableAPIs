import React, { useContext } from 'react'
import { CommentMutations } from '@thelasthurrah/comment_api'

import {
    CommentAPIProvider,
    ICommentProvider,
} from '../common/BinaryStashProvider'

export function useBinaryCommentMutations(): CommentMutations {
    const client = useContext(CommentAPIProvider) as ICommentProvider

    // console.log('CLIENT', client)

    return client.mutations
}
