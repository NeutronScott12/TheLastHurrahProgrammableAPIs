// import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { useCurrentUserQuery } from '../../generated/graphql'

interface IUseCurrentUser {
    client?: ApolloClient<NormalizedCacheObject>
}

export const useCurrentUser = ({ client }: IUseCurrentUser) => {
    return useCurrentUserQuery({ client: client ? client : undefined })
}
