import { Scalars, Sort } from '../../generated/graphql'

export type FetchCommentByThreadId = {
    limit?: Scalars['Int']
    skip?: Scalars['Int']
    sort?: Sort
    thread_id: Scalars['String']
}
