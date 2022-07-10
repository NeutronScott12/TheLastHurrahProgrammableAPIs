import {
    ApolloClient,
    ApolloError,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client'
import { GraphQLClient } from 'graphql-request'

import {
    CreateCommentInput,
    CreateCommentReportDocument,
    CreateCommentReportMutation,
    CreateCommentReportMutationVariables,
    CreateReplyCommentInput,
    DownVoteCommentDocument,
    DownVoteCommentMutation,
    DownVoteCommentMutationVariables,
    Report_Reason,
    Sort,
    UpdateCommentInput,
    UpVoteCommentDocument,
    UpVoteCommentMutation,
    UpVoteCommentMutationVariables,
} from '../generated/graphql'

import { createComment } from './services/createComment'
import { createReplyComment } from './services/createReplyComment'
import { deleteComment } from './services/deleteComment'
import { deleteReplyComment } from './services/deleteReplyComment'
import { editComment } from './services/editComment'
import { findOneOrCreateOneThread } from './services/findOneOrCreateOneThread'
import {
    ICommentAPI,
    IDeleteCommentArgs,
    IDeleteReplyCommentArgs,
    IEditCommentArgs,
    IFindOrCreateOneThreadInputArgs,
    IReplyCommentArgs,
} from './types'

export class CommentMutations {
    client: ApolloClient<NormalizedCacheObject>
    graphql_request_client: GraphQLClient
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
        this.cache = cache

        this.client = client
        this.limit = limit
        this.skip = skip
        this.sort = sort
        this.application_short_name = application_short_name
    }

    public async createComment(args: CreateCommentInput) {
        try {
            if (!args) {
                throw new Error('Incorrect or Incomplete Arguments')
            }

            return createComment(args, { ...this })
        } catch (error) {
            throw new ApolloError({})
        }
    }

    public async createReplyComment(args: CreateReplyCommentInput) {
        try {
            if (!args) {
                throw new Error('Incorrect or Incomplete arguments')
            }

            return createReplyComment(args, { ...this })
        } catch (error) {
            throw new ApolloError({})
        }
    }

    public async editComment(args: IEditCommentArgs) {
        try {
            if (!args) {
                throw new Error('Incorrect or Incomplete Arguments')
            }

            return await editComment(args, { ...this })
        } catch (error) {
            throw new Error()
        }
    }

    public async deleteComment(args: IDeleteCommentArgs) {
        try {
            if (!args) {
                throw new Error('Incorrect or Incomplete Arguments')
            }

            return await deleteComment(args, { ...this })
        } catch (error) {
            throw new ApolloError({})
        }
    }

    public async deleteReplyComment(args: IDeleteReplyCommentArgs) {
        try {
            const self = this
            if (!args) {
                throw new Error('Incorrect or Incomplete Arguments')
            }

            return await deleteReplyComment(args, { ...this })
        } catch (error) {
            throw new ApolloError({})
        }
    }

    public async upVoteComment(comment_id: string) {
        try {
            if (!comment_id) {
                throw new Error('Incorrect or Incomplete Arguments')
            }

            return await this.client.mutate<
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
            if (!comment_id) {
                throw new Error('Incorrect or Incomplete Arguments')
            }

            return this.client.mutate<
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

    public async reportComment(
        comment_id: string,
        report_reason: Report_Reason,
    ) {
        try {
            if (!comment_id) {
                throw new Error('Incorrect or Incomplete Arguments')
            }

            return this.client.mutate<
                CreateCommentReportMutation,
                CreateCommentReportMutationVariables
            >({
                mutation: CreateCommentReportDocument,
                variables: {
                    createReportInput: {
                        comment_id,
                        report: report_reason,
                    },
                },
            })
        } catch (error) {
            throw new Error()
        }
    }

    public async findOneOrCreateOneThread(
        args: IFindOrCreateOneThreadInputArgs,
    ) {
        try {
            return findOneOrCreateOneThread(args, { ...this })
        } catch (error) {
            throw new ApolloError({})
        }
    }
}
