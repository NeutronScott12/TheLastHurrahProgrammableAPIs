import {
    ApolloClient,
    ApolloError,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client/core'

import { IAuthenticationAPI } from '../types'
import { change_password } from './services/change_password'
import { delete_user } from './services/delete_user'
import { forgot_password } from './services/forgot_password'
import { login } from './services/login'
import { regsiter } from './services/register'
import { two_factor_login } from './services/two_factor_login'
import {
    IChangePasswordArgs,
    IDeleteUserArgs,
    IForgotPasswordArgs,
    ILoginArgs,
    IRegisterArgs,
    ITwoFactorLogin,
} from './types'
import {
    changePasswordValidation,
    loginPasswordValidation,
    registrationValidation,
    twoFactorValidation,
} from './validation'

export class AuthenticationMutations {
    client: ApolloClient<NormalizedCacheObject>
    cache: InMemoryCache
    application_short_name: string
    changeToken: (token: string) => void

    constructor({
        client,
        cache,
        application_short_name,
        changeToken,
    }: IAuthenticationAPI) {
        this.application_short_name = application_short_name
        this.client = client
        this.cache = cache
        this.changeToken = changeToken
    }

    public async login(args: ILoginArgs) {
        try {
            await loginPasswordValidation.validate(args)

            return login(args, { ...this })
        } catch (error) {
            throw new ApolloError({})
        }
    }

    public async register(args: IRegisterArgs) {
        try {
            await registrationValidation.validate(args)

            return regsiter(args, { ...this })
        } catch (error) {
            console.log(error)
            throw new ApolloError({})
        }
    }

    public async two_factor_login(args: ITwoFactorLogin) {
        try {
            await twoFactorValidation.validate(args)

            return two_factor_login(args, { ...this })
        } catch (error) {
            console.log('BIG ERROR', error)
            throw new ApolloError({})
        }
    }

    public async forgot_password(args: IForgotPasswordArgs) {
        try {
            return forgot_password(args, { ...this })
        } catch (error) {
            throw new ApolloError({})
        }
    }

    public async change_password(args: IChangePasswordArgs) {
        try {
            await changePasswordValidation.validate(args)

            return change_password(args, { ...this })
        } catch (error) {
            console.log('CHANGE_PASSWORD_FRONT', error)
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
