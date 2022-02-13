import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import IdentificationStep from "../../components/Auth/RegistrationForm/Steps/IdentificationStep";

const IdentificationStepContainer = ({handleChange, handleBlur, nextStep, values, touched, errors}) => {

    return (
        <IdentificationStep
            nextStep={nextStep}
            handleChange={handleChange}
            handleBlur={handleBlur}
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