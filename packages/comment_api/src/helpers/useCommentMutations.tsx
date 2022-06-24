import React, { useContext } from 'react'
import { CommentMutations } from '../mutations'

import {
    CommentAPIProvider,
    ICommentProvider,
} from './BinaryStashCommentProvider'

export const useBinaryCommentMutations = (): CommentMutations => {
    const client = useContext(CommentAPIProvider) as ICommentProvider

    // console.log('CLIENT', client)

    return client.mutations
}
