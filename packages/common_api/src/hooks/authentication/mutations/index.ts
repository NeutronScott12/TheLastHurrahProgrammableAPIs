import {
    ChangePasswordMutationHookResult,
    LoginMutationHookResult,
    RegistrationMutationHookResult,
    useLoginMutation,
    useRegistrationMutation,
    useChangePasswordMutation,
    ForgotPasswordMutationHookResult,
    useForgotPasswordMutation,
    TwoFactorLoginMutationHookResult,
    useTwoFactorLoginMutation,
} from '@thelasthurrah/authentication_api'
import { useBinaryAuthMutations } from './useBinaryMutations'

export const useLogin = (): LoginMutationHookResult => {
    const binary = useBinaryAuthMutations()
    return useLoginMutation({ client: binary.client })
}

export const useRegister = (): RegistrationMutationHookResult => {
    const binary = useBinaryAuthMutations()
    return useRegistrationMutation({ client: binary.client })
}

export const useChangePassword = (): ChangePasswordMutationHookResult => {
    const binary = useBinaryAuthMutations()
    return useChangePasswordMutation({ client: binary.client })
}

export const useForgotPasswword = (): ForgotPasswordMutationHookResult => {
    const binary = useBinaryAuthMutations()
    return useForgotPasswordMutation({ client: binary.client })
}

export const useTwoFactorLogin = (): TwoFactorLoginMutationHookResult => {
    const binary = useBinaryAuthMutations()
    return useTwoFactorLoginMutation({ client: binary.client })
}
