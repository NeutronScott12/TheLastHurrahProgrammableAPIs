import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import {
    Sort,
    useFetchCommentByThreadIdQuery,
    FetchCommentByThreadIdQueryHookResult,
    useFindOneOrCreateOneThreadQuery,
    FindOneOrCreateOneThreadQueryHookResult,
} from '../../generated/graphql'
import { IHelperArgs } from '../../mutations/types'

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

interface IUseFindOrCreateThreadOpts extends Omit<IHelperArgs, 'cache'> {
    client?: ApolloClient<NormalizedCacheObject>
    website_url: string
    title: string
}

export const useFindorCreateThread = ({
    client,
    website_url,
    title,
}: IUseFindOrCreateThreadOpts): FindOneOrCreateOneThreadQueryHookResult => {
    return useFindOneOrCreateOneThreadQuery({
        client: client ? client : undefined,
        variables: {
            findOrCreateOneThreadInput: {
                application_id: 'first-application',
                website_url,
                title,
            },
        },
    })
}
