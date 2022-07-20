import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import {
    useLoginMutation,
    useRegistrationMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useTwoFactorLoginMutation,
    LoginMutationHookResult,
    RegistrationMutationHookResult,
    ChangePasswordMutationHookResult,
    ForgotPasswordMutationHookResult,
    TwoFactorLoginMutationHookResult,
} from '../../generated/graphql'

interface IUseArgs {
    client?: ApolloClient<NormalizedCacheObject>
}

export const useLogin = ({ client }: IUseArgs): LoginMutationHookResult => {
    return useLoginMutation({ client: client ? client : undefined })
}

export const useRegister = ({
    client,
}: IUseArgs): RegistrationMutationHookResult => {
    return useRegistrationMutation({ client: client ? client : undefined })
}

export const useChangePassword = ({
    client,
}: IUseArgs): ChangePasswordMutationHookResult => {
    return useChangePasswordMutation({ client: client ? client : undefined })
}

export const useForgotPasswword = ({
    client,
}: IUseArgs): ForgotPasswordMutationHookResult => {
    return useForgotPasswordMutation({ client: client ? client : undefined })
}

export const useTwoFactorLogin = ({
    client,
}: IUseArgs): TwoFactorLoginMutationHookResult => {
    return useTwoFactorLoginMutation({ client: client ? client : undefined })
}
