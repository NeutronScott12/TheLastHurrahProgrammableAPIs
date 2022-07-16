import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import {
    Sort,
    useFetchCommentByThreadIdQuery,
    FetchCommentByThreadIdQueryHookResult,
} from '../../generated/graphql'

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
