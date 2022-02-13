import * as Yup from "yup";

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email')
        .max(30, 'Email must be shorter than 30 characters')
        .required('Email is required'),
    username: Yup.string()
        .min(5, 'Username must be longer than 5 characters')
        .max(20, 'Username must be shorter than 20 characters')
        .required('Username is required'),
    password: Yup.string()
        .min(8, 'Password must be longer than 8 characters')
        .max(50, 'Password must be shorter than 50 characters')
        .required('Password is required'),
    confirmationPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords are not equal')
        .required('Confirmation password is required'),
    code: Yup.string()
        .min(6, 'Code must be 6 characters')
        .required('Code is required')
});

export default validationSchema;