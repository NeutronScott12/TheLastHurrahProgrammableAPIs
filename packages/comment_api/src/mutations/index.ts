import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import {
    CreateCommentInput,
    CreateThreadComentDocument,
    CreateThreadComentMutation,
    CreateThreadComentMutationVariables,
} from '../generated/graphql'
import { CommentAPIErrors } from '../helpers/errors'

export class CommentMutations {
    client: ApolloClient<NormalizedCacheObject>

    constructor(client: ApolloClient<NormalizedCacheObject>) {
        this.client = client
    }

    public async createComment(args: CreateCommentInput) {
        try {
            if (!args) {
                throw new Error('Incorrect or Incomplete Arguments')
            }

            const { application_id, json_body, plain_text_body, thread_id } =
                args

            const result = await this.client.mutate<
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
                        sort: currentSort,
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
                                    response.fetch_comments_by_thread_id
                                        .__typename,
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
                            sort: currentSort,
                            application_short_name,
                            data: changedObject,
                        })
                    }
                },
            })
        } catch (error) {
            console.log('ERROR', error)
            return error as CommentAPIErrors
        }
    }
}
