import React, { useContext } from 'react'
import { CommentMutations } from '@thelasthurrah/comment_api'

import {
    CommentAPIProvider,
    IBinaryStashProvider,
} from '../common/BinaryStashProvider'
import { BinaryStashClient } from '../../BinaryStashClient'

export function useBinaryCommentMutations(): CommentMutations {
    const context = useContext(CommentAPIProvider) as BinaryStashClient

    // console.log('context', context)

    return context.comment_mutations
}
