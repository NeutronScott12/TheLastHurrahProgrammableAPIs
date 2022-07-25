export * from './CommentMutations'
export * from './hooks'
export type {
    CreateCommentMutationHookResult,
    EditThreadCommentMutationHookResult,
    DeleteThreadCommentMutationHookResult,
    CreateReplyCommentMutationHookResult,
    UpVoteCommentMutationHookResult,
    DownVoteCommentMutationHookResult,
    CreateCommentReportMutationHookResult,
} from '../generated/graphql'
export {
    useCreateCommentMutation,
    useEditThreadCommentMutation,
    useDeleteThreadCommentMutation,
    useCreateReplyCommentMutation,
    useUpVoteCommentMutation,
    useDownVoteCommentMutation,
    useCreateCommentReportMutation,
} from '../generated/graphql'
export * from './helpers/functions'
