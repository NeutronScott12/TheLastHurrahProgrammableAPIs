import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client'

import {
    Sort,
    useCreateCommentMutation,
    useEditThreadCommentMutation,
} from '../../generated/graphql'
import { createCommentHelper, editComemntHelper } from '../helpers/functions'

interface IUseCreateCommentOpts {
    limit: number
    skip: number
    sort: Sort
    application_short_name: string
    cache?: InMemoryCache
    client?: ApolloClient<NormalizedCacheObject>
}

export const useCreateComment = (
    args: { thread_id: string },
    options: IUseCreateCommentOpts,
) => {
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

interface IUseEditCommentOpts {
    thread_id: string
    skip: number
    limit: number
    application_short_name: string
    sort: Sort
    client?: ApolloClient<NormalizedCacheObject>
}

export const useEditComment = ({
    client,
    thread_id,
    skip,
    limit,
    sort,
    application_short_name,
}: IUseEditCommentOpts) => {
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
