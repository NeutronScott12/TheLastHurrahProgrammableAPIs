export * from './CommmentQueries'
export * from './hooks'

export type { FetchCommentByThreadIdQueryHookResult } from '../generated/graphql'

export {
    useFetchCommentByThreadIdQuery,
    useFindOneOrCreateOneThreadQuery,
} from '../generated/graphql'
