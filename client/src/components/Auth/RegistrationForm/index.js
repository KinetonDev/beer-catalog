import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import useStyle from './styles'
import {Step, StepLabel, Stepper, Typography} from "@mui/material";
import selectStepByValue from "./Steps/selectStepByValue";

const stepLabels = ["Email and username", "Password", "Confirmation"];

const RegistrationForm = (props) => {
    const classes = useStyle();
    const [step, setStep] = useState(1);
    const [user, setUser] = useState({});

    const stepProps = useMemo(() => {
        return {
            nextStep: () => setStep(step => step + 1),
            prevStep: () => setStep(step => step - 1),
            setUser: setUser
        }
    }, [setStep]);

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
            {selectStepByValue(step, stepProps)}
        </div>
    );
};

RegistrationForm.propTypes = {

};

export default RegistrationForm;