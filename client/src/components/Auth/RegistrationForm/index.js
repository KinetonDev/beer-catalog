import React from 'react';
import useStyle from './styles'
import {Step, StepLabel, Stepper, Typography} from "@mui/material";
import selectStepByValue from "./Steps/selectStepByValue";
import {Formik} from 'formik';
import validationSchema from './validationSchema'
import stepLabels from "./Steps/stepLabels";
import PropTypes from 'prop-types'

const RegistrationForm = ({step, handleSubmit, nextStep, prevStep}) => {
    const classes = useStyle();

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
            >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  isSubmitting,
                  handleBlur,
                  setSubmitting}) => (
                    <form onSubmit={handleSubmit}>
                        {selectStepByValue(step, {
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleSubmit,
                            handleBlur,
                            setSubmitting,
                            isSubmitting,
                            nextStep,
                            prevStep
                        })}
                    </form>
                )}
            </Formik>
        </div>
    );
};

RegistrationForm.propTypes = {
    step: PropTypes.number.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
    prevStep: PropTypes.func.isRequired
};

export default RegistrationForm;