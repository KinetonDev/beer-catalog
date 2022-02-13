import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import PasswordStep from "../../components/Auth/RegistrationForm/Steps/PasswordStep";

const PasswordStepContainer = ({nextStep, prevStep, handleChange, handleBlur, values, touched, errors}) => {
    return (
        <PasswordStep
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
            touched={touched}
            errors={errors}
            areInputsInvalid={errors.password !== undefined}
        />
    );
};

PasswordStepContainer.propTypes = {
    nextStep: PropTypes.func.isRequired,
    prevStep: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
};

export default PasswordStepContainer;