import { InMemoryCache } from '@apollo/client/cache'
import {
    FetchCommentByThreadIdDocument,
    FetchCommentByThreadIdQuery,
    Sort,
} from '../generated/graphql'

export interface IFetchCommentByThreadIdQueryArgs {
    thread_id: string
    limit: number
    skip: number
    sort: Sort
    application_short_name: string
    cache: InMemoryCache
}

export const fetchCommentByThreadIdQueryCache = ({
    thread_id,
    limit,
    skip,
    sort,
    application_short_name,
    cache,
}: IFetchCommentByThreadIdQueryArgs) => {
    return cache.readQuery<FetchCommentByThreadIdQuery>({
        query: FetchCommentByThreadIdDocument,
        variables: {
            fetchCommentByThreadIdInput: {
                thread_id,
                limit,
                skip,
                sort,
                application_short_name,
            },
        },
    })
}

interface IWriteCommentByThreadIdQueryArgs
    extends IFetchCommentByThreadIdQueryArgs {
    data: {}
}

export const WriteCommentByThreadIdQueryArgs = ({
    thread_id,
    limit,
    skip,
    sort,
    application_short_name,
    data,
    cache,
}: IWriteCommentByThreadIdQueryArgs) => {
    cache.writeQuery({
        query: FetchCommentByThreadIdDocument,
        variables: {
            fetchCommentByThreadIdInput: {
                thread_id,
                limit,
                skip,
                sort,
                application_short_name,
            },
        },
        data,
    })
}
