import { clone, mergeDeepRight } from 'ramda'
import {
    CreateCommentInput,
    CreateThreadComentDocument,
    CreateThreadComentMutation,
    CreateThreadComentMutationVariables,
} from '../../generated/graphql'
import {
    fetchCommentByThreadIdQueryCache,
    WriteCommentByThreadIdQueryArgs,
} from '../../helpers'
import { CommentAPIErrors } from '../../helpers/errors'
import { ICommentAPI } from '../types'

export const createComment = async (
    args: CreateCommentInput,
    global: ICommentAPI,
) => {
    const { application_id, json_body, plain_text_body, thread_id } = args

    const { client, limit, skip, application_short_name, sort } = global

    try {
        return await client.mutate<
            CreateThreadComentMutation,
            CreateThreadComentMutationVariables
        >({
            mutation: CreateThreadComentDocument,
            variables: {
                createCommentInput: {
                    application_id,
                    json_body,
                    plain_text_body,
                    thread_id,
                },
            },
            update(cache, { data }) {
                const response = fetchCommentByThreadIdQueryCache({
                    thread_id,
                    limit,
                    skip,
                    application_short_name,
                    sort,
                    cache: global.cache,
                })

                if (
                    response &&
                    response.fetch_comments_by_thread_id &&
                    data &&
                    data.create_comment
                ) {
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
                                ...cloneData.fetch_comments_by_thread_id
                                    .comments,
                            ],
                        },
                    }

                    const changedObject = mergeDeepRight(cloneData, newData)

                    WriteCommentByThreadIdQueryArgs({
                        thread_id,
                        limit,
                        skip,
                        sort,
                        application_short_name,
                        data: changedObject,
                        cache: global.cache,
                    })
                }
            },
        })
    } catch (error) {
        console.log('ERROR', error)
        return error as CommentAPIErrors
    }
}
