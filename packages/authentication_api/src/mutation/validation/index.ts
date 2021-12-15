import * as yup from 'yup'

const validationSchema = yup.object({
    email: yup.string().email('Invalid Email').required('Email is required'),
    password: yup
        .string()
        .min(3, 'Password should be of minimum 3 characters length')
        .required('Password is required'),
    // repeat_password: yup.string().test('passwords-match', 'Passwords must match', function (value) {
    // 	return this.parent.password === value
    // }),
    // username: yup.string().required(),
})

export const twoFactorValidation = yup.object({
    email: yup.string().email('Invalid Email').required('Email is required'),
    two_factor_id: yup.string().required(),
})

export const changePasswordValidation = validationSchema

export const loginPasswordValidation = validationSchema

export const registrationValidation = validationSchema.concat(
    yup.object().shape({
        username: yup.string().required(),
        repeat_password: yup
            .string()
            .test('passwords-match', 'Passwords must match', function (value) {
                return this.parent.password === value
            }),
    }),
)
