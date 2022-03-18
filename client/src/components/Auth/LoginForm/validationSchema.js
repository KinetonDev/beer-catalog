import * as Yup from "yup";

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email')
        .max(30, 'Email must be shorter than 30 characters')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be longer than 8 characters')
        .max(50, 'Password must be shorter than 50 characters')
        .required('Password is required')
});

export default validationSchema;