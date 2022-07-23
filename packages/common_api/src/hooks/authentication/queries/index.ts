import { useCurrentUserQuery } from '@thelasthurrah/authentication_api'
import { useBinaryAuthQueries } from './useBinaryQueries'

export const useCurrentUser = () => {
    const binary = useBinaryAuthQueries()

    return useCurrentUserQuery({ client: binary.client })
}
