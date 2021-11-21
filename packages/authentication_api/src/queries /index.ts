import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import { CurrentUserDocument, CurrentUserQuery } from '../generated/graphql'
import { AuthenticationAPIErrors } from '../helpers/errors'

export class AuthenticationQueries {
    client: ApolloClient<NormalizedCacheObject>

    constructor(client: ApolloClient<NormalizedCacheObject>) {
        this.client = client
    }

    public async currentUser() {
        try {
            return this.client.query<CurrentUserQuery>({
                query: CurrentUserDocument,
            })
        } catch (error) {
            return error as AuthenticationAPIErrors
        }
    }
}
