import React, {useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import EmailConfirmationStep from "../../components/Auth/RegistrationForm/Steps/EmailConfirmationStep";

const EmailConfirmationStepContainer = ({handleChange, handleBlur, isSubmitting, values, touched, errors, formRef}) => {
    const handleCodeCompletion = useCallback((e) => {
        handleChange(e);

        console.log(e.target.value.length)

        if(e.target.value.length === 6) {
            formRef.current.submit();
        }
    }, [handleChange]);

    return (
        <EmailConfirmationStep
            isSubmitting={isSubmitting}
            handleChange={handleCodeCompletion}
            handleBlur={handleBlur}
            values={values}
            errors={errors}
            touched={touched}
        />
    );
};

EmailConfirmationStepContainer.propTypes = {
    isSubmitting: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    formRef: PropTypes.object.isRequired
};

export default EmailConfirmationStepContainer;