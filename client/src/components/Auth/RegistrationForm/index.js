import React, {useCallback, useMemo, useRef, useState} from 'react';
import useStyle from './styles'
import {Step, StepLabel, Stepper, Typography} from "@mui/material";
import selectStepByValue from "./Steps/selectStepByValue";
import {Formik} from 'formik';
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import routes from "../../../router/routes";

const stepLabels = ["Email and username", "Password", "Confirmation"];

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

const RegistrationForm = () => {
    const classes = useStyle();
    const [step, setStep] = useState(1);

    const navigate = useNavigate();

    const formRef = useRef(null);

    const handleSubmit = useCallback((values, {setSubmitting}) => {
        console.log("Very complicated api call" , values);
        setSubmitting(false);
        navigate(routes.landing);
    }, [navigate]);

    return (
        <div className={classes.registerForm}>
            <Typography variant={"h4"}>Registration</Typography>
            <Stepper
                activeStep={step}
                className={classes.stepper}
            >
                {stepLabels.map(label => {
                    return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            <Formik
                initialValues={{
                    email: '',
                    username: '',
                    password: '',
                    confirmationPassword: '',
                    code: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({handleSubmit,
                  values,
                  errors,
                  touched,
                  handleChange,
                  isSubmitting,
                  handleBlur,
                  setSubmitting}) => (
                    <form onSubmit={handleSubmit} ref={formRef}>
                        {selectStepByValue(step, {
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleSubmit,
                            handleBlur,
                            setSubmitting,
                            isSubmitting,
                            formRef,
                            nextStep: () => setStep(step => step + 1),
                            prevStep: () => setStep(step => step - 1),
                        })}
                    </form>
                )}
            </Formik>
        </div>
    );
};

RegistrationForm.propTypes = {

};

export default RegistrationForm;