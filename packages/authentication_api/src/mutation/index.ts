import {
    ApolloClient,
    ApolloError,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client/core'
import { AuthenticationAPIErrors } from '../helpers/errors'
import { IAuthenticationAPI } from '../types'
import { delete_user } from './services/delete_user'
import { forgot_password } from './services/forgot_password'
import { login } from './services/login'
import { regsiter } from './services/register'
import { two_factor_login } from './services/two_factor_login'
import {
    IDeleteUserArgs,
    IForgotPasswordArgs,
    ILoginArgs,
    IRegisterArgs,
    ITwoFactorLogin,
} from './types'

export class AuthenticationMutations {
    client: ApolloClient<NormalizedCacheObject>
    cache: InMemoryCache

    constructor({ client, cache }: IAuthenticationAPI) {
        this.client = client
        this.cache = cache
    }

    public async login(args: ILoginArgs) {
        try {
            return login(args, { ...this })
        } catch (error) {
            throw new ApolloError({})
        }
    }

    public async register(args: IRegisterArgs) {
        try {
            return regsiter(args, { ...this })
        } catch (error) {
            throw new ApolloError({})
        }
    }

    public async two_factor_loing(args: ITwoFactorLogin) {
        try {
            return two_factor_login(args, { ...this })
        } catch (error) {
            return error as AuthenticationAPIErrors
        }
    }

    public async forgot_password(args: IForgotPasswordArgs) {
        try {
            return forgot_password(args, { ...this })
        } catch (error) {
            throw new ApolloError({})
        }
    }

    public async delete_user(args: IDeleteUserArgs) {
        try {
            return delete_user(args, { ...this })
        } catch (error) {
            throw new ApolloError({})
        }
    }
}
