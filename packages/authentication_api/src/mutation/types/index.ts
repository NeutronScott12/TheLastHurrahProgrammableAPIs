export interface ILoginArgs {
    email: string
    password: string
}

export interface IRegisterArgs {
    email: string
    password: string
    username: string
    repeat_password: string
    application_id?: string
    redirect_url?: string
    two_factor_authentication?: boolean
}

export interface ITwoFactorLogin {
    two_factor_id: string
    email: string
}

export interface IForgotPasswordArgs {
    email: string
    redirect_url: string
}

export interface IDeleteUserArgs {
    email: string
}

export interface IChangePasswordArgs {
    email: string
    password: string
}
