import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

import {
    CreateCommentMutationHookResult,
    CreateCommentReportMutationHookResult,
    CreateReplyCommentMutationHookResult,
    DeleteThreadCommentMutationHookResult,
    DownVoteCommentMutationHookResult,
    EditThreadCommentMutationHookResult,
    UpVoteCommentMutationHookResult,
    useCreateCommentMutation,
    useCreateCommentReportMutation,
    useCreateReplyCommentMutation,
    useDeleteThreadCommentMutation,
    useDownVoteCommentMutation,
    useEditThreadCommentMutation,
    useUpVoteCommentMutation,
} from '../../generated/graphql'
import {
    createCommentHelper,
    deleteCommentHelper,
    editComemntHelper,
    deleteReplyCommentHelper,
    createReplyHelper,
} from '../helpers/functions'
import { IHelperArgs } from '../types'

interface IUseCreateCommentOpts
    extends Omit<IHelperArgs, 'cache' | 'thread_id'> {
    client?: ApolloClient<NormalizedCacheObject>
}

export const useCreateComment = (
    args: { thread_id: string },
    options: IUseCreateCommentOpts,
): CreateCommentMutationHookResult => {
    const { limit, skip, application_short_name, sort, client } = options

    return useCreateCommentMutation({
        client: client ? client : undefined,
        update(cache, { data }) {
            createCommentHelper({
                thread_id: args.thread_id,
                limit,
                skip,
                application_short_name,
                sort,
                cache,
                data,
            })
        },
    })
}

interface IUseEditCommentOpts extends Omit<IHelperArgs, 'cache'> {
    client?: ApolloClient<NormalizedCacheObject>
}

export const useEditComment = ({
    client,
    thread_id,
    skip,
    limit,
    sort,
    application_short_name,
}: IUseEditCommentOpts): EditThreadCommentMutationHookResult => {
    return useEditThreadCommentMutation({
        client: client ? client : undefined,
        update(cache, { data }) {
            editComemntHelper({
                thread_id,
                data,
                cache,
                skip,
                limit,
                application_short_name,
                sort,
            })
        },
    })
}

interface IUseDeleteComment extends Omit<IHelperArgs, 'cache'> {
    client: ApolloClient<NormalizedCacheObject>
    comment_id: string
}

export const useDeleteComment = ({
    client,
    application_short_name,
    limit,
    skip,
    thread_id,
    sort,
    comment_id,
}: IUseDeleteComment): DeleteThreadCommentMutationHookResult => {
    return useDeleteThreadCommentMutation({
        client: client ? client : undefined,
        update(cache, { data }) {
            if (data && data.delete_comment) {
                deleteCommentHelper({
                    data,
                    comment_id,
                    cache,
                    thread_id,
                    application_short_name,
                    sort,
                    limit,
                    skip,
                })
            }
        },
    })
}

interface IUseDeleteReplyCommentOpts extends IHelperArgs {
    client?: ApolloClient<NormalizedCacheObject>
    comment_id: string
    parent_id?: string
}

export const useDeleteReplyComment = ({
    client,
    application_short_name,
    limit,
    skip,
    sort,
    thread_id,
    comment_id,
    parent_id,
}: IUseDeleteReplyCommentOpts): DeleteThreadCommentMutationHookResult => {
    return useDeleteThreadCommentMutation({
        client: client ? client : undefined,
        update(cache, { data }) {
            deleteReplyCommentHelper({
                application_short_name,
                cache,
                comment_id,
                parent_id: parent_id ? parent_id : null,
                limit,
                skip,
                sort,
                thread_id,
            })
        },
    })
}

interface IUseCreateReplyCommentOpts extends Omit<IHelperArgs, 'cache'> {
    client?: ApolloClient<NormalizedCacheObject>
}

export const useCreateReplyComment = ({
    client,
    thread_id,
    skip,
    limit,
    sort,
    application_short_name,
}: IUseCreateReplyCommentOpts): CreateReplyCommentMutationHookResult => {
    return useCreateReplyCommentMutation({
        client: client ? client : undefined,
        update(cache, { data }) {
            createReplyHelper({
                thread_id,
                data,
                cache,
                skip,
                limit,
                sort,
                application_short_name,
            })
        },
    })
}

interface IUseCommentVoteOpts extends Omit<IHelperArgs, 'cache'> {
    client?: ApolloClient<NormalizedCacheObject>
}

interface IUseCommentVoteResult {
    upvote: UpVoteCommentMutationHookResult
    downvote: DownVoteCommentMutationHookResult
}

export const useCommentVote = ({
    client,
}: IUseCommentVoteOpts): IUseCommentVoteResult => {
    return {
        upvote: useUpVoteCommentMutation({
            client: client ? client : undefined,
        }),
        downvote: useDownVoteCommentMutation({
            client: client ? client : undefined,
        }),
    }
}

interface IUseReportCommentOpts extends Omit<IHelperArgs, 'cache'> {
    client?: ApolloClient<NormalizedCacheObject>
}

export const useReportComment = ({
    client,
}: IUseReportCommentOpts): CreateCommentReportMutationHookResult => {
    return useCreateCommentReportMutation({
        client: client ? client : undefined,
    })
}
