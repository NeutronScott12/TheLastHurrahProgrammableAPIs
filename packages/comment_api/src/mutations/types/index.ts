import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client/core'
import { Maybe, Sort } from '../../generated/graphql'

export interface ICommentAPI {
    client: ApolloClient<NormalizedCacheObject>
    cache: InMemoryCache
    limit: number
    skip: number
    sort: Sort
    application_short_name: string
}

export interface IEditCommentArgs {
    plain_text_body: string
    comment_id: string
    json_body: JSON
    thread_id: string
}

export interface IDeleteCommentArgs {
    comment_id: string
    thread_id: string
}

export interface IDeleteReplyCommentArgs {
    comment_id: string
    parent_id: Maybe<string> | undefined
    thread_id: string
}

export interface IReplyCommentArgs {
    plain_text_body: string
    comment_id: string
    json_body: JSON
    thread_id: string
    parent_id: string
    application_id: string
    replied_to_id: string
}
