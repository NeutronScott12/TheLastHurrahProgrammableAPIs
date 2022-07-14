import {
    fetchCommentByThreadIdQueryCache,
    WriteCommentByThreadIdQueryArgs,
} from '../../helpers'
import {
    CreateCommentInput,
    Sort,
    useCreateCommentMutation,
} from '../../generated/graphql'
import { clone, mergeDeepRight } from 'ramda'
import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client'

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
            const response = fetchCommentByThreadIdQueryCache({
                thread_id: args.thread_id,
                limit,
                skip,
                application_short_name,
                sort,
                cache,
            })

            console.log('FIRST_RESPONSE', response)

            if (
                response &&
                response.fetch_comments_by_thread_id &&
                data &&
                data.create_comment
            ) {
                console.log('RESPONSE', response)
                console.log('DATA', data)

                const cloneData = clone(response)
                const newData = {
                    fetch_comments_by_thread_id: {
                        __typename:
                            response.fetch_comments_by_thread_id.__typename,
                        comments_count:
                            cloneData.fetch_comments_by_thread_id
                                .comments_count,
                        comments: [
                            data.create_comment,
                            ...cloneData.fetch_comments_by_thread_id.comments,
                        ],
                    },
                }

                const changedObject = mergeDeepRight(cloneData, newData)

                WriteCommentByThreadIdQueryArgs({
                    thread_id: args.thread_id,
                    limit,
                    skip,
                    sort,
                    application_short_name,
                    data: changedObject,
                    cache,
                })
            }
        },
    })
}
