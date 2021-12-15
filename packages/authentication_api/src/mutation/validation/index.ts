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

export const changePasswordValidation = validationSchema.concat(
    yup.object().shape({
        repeat_password: yup
            .string()
            .test('passwords-match', 'Passwords must match', function (value) {
                return this.parent.password === value
            }),
    }),
)

export const loginPasswordValidation = validationSchema

export const registrationValidation = validationSchema.concat(
    yup.object().shape({ username: yup.string().required() }),
)
