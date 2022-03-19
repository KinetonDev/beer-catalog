import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import IdentificationStep from "../../../components/Auth/RegistrationForm/Steps/IdentificationStep";

const IdentificationStepContainer = ({handleChange, handleBlur, nextStep, values, touched, errors, checkIfEmailExists, checkIfUsernameExists}) => {
    const handleEmailBlur = useCallback((e) => {
        handleBlur(e);
        console.log(touched)
        if (touched.email && !errors.email) {
            console.log("email check")
            checkIfEmailExists(values.email);
        }
    }, [handleBlur, touched, errors, checkIfEmailExists, values]);

    const handleUsernameBlur = useCallback((e) => {
        handleBlur(e);
        console.log(touched)
        if (touched.username && !errors.username) {
            console.log("username check")
            checkIfUsernameExists(values.username);
        }
    }, [handleBlur, touched, errors, checkIfUsernameExists, values]);

    return (
        <IdentificationStep
            nextStep={nextStep}
            handleChange={handleChange}
            handleEmailBlur={handleEmailBlur}
            handleUsernameBlur={handleUsernameBlur}
            values={values}
            errors={errors}
            touched={touched}
            areInputsInvalid={errors.username !== undefined || errors.email !== undefined}
        />
    );
};

IdentificationStepContainer.propTypes = {
    nextStep: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
};

export default IdentificationStepContainer;