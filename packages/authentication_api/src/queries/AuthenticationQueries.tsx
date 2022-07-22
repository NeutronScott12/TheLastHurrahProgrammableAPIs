import {
    ApolloClient,
    ApolloError,
    NormalizedCacheObject,
} from '@apollo/client/core'
import { CurrentUserDocument, CurrentUserQuery } from '../generated/graphql'

export class AuthenticationQueries {
    client: ApolloClient<NormalizedCacheObject>

    constructor(client: ApolloClient<NormalizedCacheObject>) {
        this.client = client
    }

    public async currentUser() {
        try {
            const result = await this.client.query<CurrentUserQuery>({
                query: CurrentUserDocument,
            })

            return result
        } catch (error) {
            console.log('ERROR: ', error)
            throw new ApolloError({})
        }
    }
}
