import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client'

import {
    CreateCommentInput,
    DownVoteCommentDocument,
    DownVoteCommentMutation,
    DownVoteCommentMutationVariables,
    Sort,
    UpVoteCommentDocument,
    UpVoteCommentMutation,
    UpVoteCommentMutationVariables,
} from '../generated/graphql'

import { createComment } from './services/createComment'
import { createReplyComment } from './services/createReplyComment'
import { deleteComment } from './services/deleteComment'
import { deleteReplyComment } from './services/deleteReplyComment'
import { editComment } from './services/editComment'
import {
    ICommentAPI,
    IDeleteCommentArgs,
    IDeleteReplyCommentArgs,
    IEditCommentArgs,
    IReplyCommentArgs,
} from './types'

export class CommentMutations {
    client: ApolloClient<NormalizedCacheObject>
    cache: InMemoryCache
    limit: number
    skip: number
    sort: Sort
    application_short_name: string

    constructor({
        client,
        cache,
        limit,
        skip,
        sort,
        application_short_name,
    }: ICommentAPI) {
        this.client = client
        this.cache = cache
        this.limit = limit
        this.skip = skip
        this.sort = sort
        this.application_short_name = application_short_name
    }

    public async createComment(args: CreateCommentInput) {
        try {
            const self = this
            if (!args) {
                throw new Error('Incorrect or Incomplete Arguments')
            }

            return createComment(args, { ...self })
        } catch (error) {
            return error
        }
    }

    public async createReplyComment(args: IReplyCommentArgs) {
        try {
            const self = this
            if (!args) {
                throw new Error('Incorrect or Incomplete arguments')
            }

            return createReplyComment(args, { ...self })
        } catch (error) {
            return error
        }
    }

    public async editComment(args: IEditCommentArgs) {
        try {
            const self = this
            if (!args) {
                throw new Error('Incorrect or Incomplete Arguments')
            }

            await editComment(args, { ...self })
        } catch (error) {
            throw new Error()
        }
    }

    public async deleteComment(args: IDeleteCommentArgs) {
        try {
            const self = this
            if (!args) {
                throw new Error('Incorrect or Incomplete Arguments')
            }

            return await deleteComment(args, { ...self })
        } catch (error) {
            throw new Error()
        }
    }

    public async deleteReplyComment(args: IDeleteReplyCommentArgs) {
        try {
            const self = this
            if (!args) {
                throw new Error('Incorrect or Incomplete Arguments')
            }

            return await deleteReplyComment(args, { ...self })
        } catch (error) {
            throw new Error()
        }
    }

    public async upVoteComment(comment_id: string) {
        try {
            const self = this
            if (!comment_id) {
                throw new Error('Incorrect or Incomplete Arguments')
            }

            return await self.client.mutate<
                UpVoteCommentMutation,
                UpVoteCommentMutationVariables
            >({
                mutation: UpVoteCommentDocument,
                variables: { comment_id },
            })
        } catch (error) {
            throw new Error()
        }
    }

    public async downVoteComment(comment_id: string) {
        try {
            const self = this
            if (!comment_id) {
                throw new Error('Incorrect or Incomplete Arguments')
            }

            return self.client.mutate<
                DownVoteCommentMutation,
                DownVoteCommentMutationVariables
            >({
                mutation: DownVoteCommentDocument,
                variables: { comment_id },
            })
        } catch (error) {
            throw new Error()
        }
    }
}
