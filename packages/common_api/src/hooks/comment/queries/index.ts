import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import {
    FetchCommentByThreadIdQueryHookResult,
    FindOneOrCreateOneThreadQueryHookResult,
    Sort,
    useFetchCommentByThreadIdQuery,
    useFindOneOrCreateOneThreadQuery,
} from '@thelasthurrah/comment_api'

interface IUseFetchComments {
    thread_id: string
    client?: ApolloClient<NormalizedCacheObject>
}

export const useFetchComments = ({
    client,
    thread_id,
}: IUseFetchComments): FetchCommentByThreadIdQueryHookResult => {
    return useFetchCommentByThreadIdQuery({
        client: client ? client : undefined,
        variables: {
            fetchCommentByThreadIdInput: {
                thread_id,
                application_short_name: 'first-application',
                limit: 10,
                skip: 0,
                sort: Sort.Desc,
            },
        },
    })
}

interface IUseFindOrCreateThreadOptions {
    client: ApolloClient<NormalizedCacheObject>
    website_url: string
    title: string
    application_shortname: string
    application_id: string
}

export const useFindorCreateThread = ({
    client,
    website_url,
    title,
    application_id,
}: IUseFindOrCreateThreadOptions): FindOneOrCreateOneThreadQueryHookResult => {
    return useFindOneOrCreateOneThreadQuery({
        client: client ? client : undefined,
        variables: {
            findOrCreateOneThreadInput: {
                application_id,
                website_url,
                title,
            },
        },
    })
}
