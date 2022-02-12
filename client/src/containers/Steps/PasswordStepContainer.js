import React from 'react';
import PropTypes from 'prop-types';
import PasswordStep from "../../components/Auth/RegistrationForm/Steps/PasswordStep";

const PasswordStepContainer = (props) => {
    return (
        <PasswordStep
            nextStep={props.nextStep}
            prevStep={props.prevStep}
        />
    );
};

PasswordStepContainer.propTypes = {
    nextStep: PropTypes.func.isRequired,
    prevStep: PropTypes.func.isRequired,
};

export default PasswordStepContainer;