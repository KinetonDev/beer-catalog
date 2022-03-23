import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import PasswordStep from "../../../components/Auth/RegistrationForm/Steps/PasswordStep";

const PasswordStepContainer = ({nextStep, prevStep, handleChange, handleBlur, values, touched, errors, requestRegistration}) => {
    const handleNextStep = useCallback(() => {
        requestRegistration(values);
        nextStep();
    }, [values, nextStep, requestRegistration]);

    return (
        <PasswordStep
            nextStep={handleNextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
            touched={touched}
            errors={errors}
            areInputsInvalid={errors.password !== undefined || errors.confirmationPassword !== undefined}
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