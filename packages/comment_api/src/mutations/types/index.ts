import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client/core'
import { Maybe, Sort, UpdateCommentInput } from '../../generated/graphql'

export interface ICommentAPI {
    client: ApolloClient<NormalizedCacheObject>
    limit: number
    skip: number
    sort: Sort
    application_short_name: string
    cache: InMemoryCache
}

export interface IEditCommentArgs extends UpdateCommentInput {
    thread_id: string
}

export interface IDeleteCommentArgs {
    comment_id: string
    thread_id: string
}

export interface IDeleteReplyCommentArgs {
    reply_comment_id: string
    parent_id: Maybe<string> | undefined
    thread_id: string
}

export interface IReplyCommentArgs {
    plain_text_body: string
    comment_id: string
    json_body: Object[]
    thread_id: string
    parent_id: string
    application_id: string
    replied_to_id: string
}

export interface IFindOrCreateOneThreadInputArgs {
    application_id: string
    title: string
    website_url: string
}
