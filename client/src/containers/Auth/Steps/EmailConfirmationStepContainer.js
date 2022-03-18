import React, {useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import EmailConfirmationStep from "../../../components/Auth/RegistrationForm/Steps/EmailConfirmationStep";
import {useSelector} from "react-redux";
import {
    selectIsConfirmationProcessing,
    selectConfirmationSucceeded,
    selectUserId,
    selectWasConfirmationRequested
} from "../../../redux/selectors";
import {useNavigate} from "react-router-dom";
import routes from "../../../router/routes";

const EmailConfirmationStepContainer = ({handleChange, handleBlur, values, touched, errors, confirmEmail}) => {
    const id = useSelector(state => selectUserId(state));
    const confirmationSucceeded = useSelector(state => selectConfirmationSucceeded(state));
    const isConfirmationProcessing = useSelector(state => selectIsConfirmationProcessing(state));
    const wasConfirmationRequested = useSelector(state => selectWasConfirmationRequested(state));
    const navigate = useNavigate();

    useEffect(() => {
        console.log(id)

        if(values.code.length === 6) {
            confirmEmail({...values, id});
        }
    }, [values.code, id]);

    useEffect(() => {
        if (!isConfirmationProcessing && wasConfirmationRequested && confirmationSucceeded)
        {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 500);
            }).then(() => navigate(routes.login));
        }
    }, [isConfirmationProcessing, wasConfirmationRequested, confirmationSucceeded]);

    return (
        <EmailConfirmationStep
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
            errors={errors}
            touched={touched}
            isConfirmationProcessing={isConfirmationProcessing}
            confirmationSucceeded={confirmationSucceeded}
            wasConfirmationRequested={wasConfirmationRequested}
        />
    );
};

EmailConfirmationStepContainer.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
};

export default EmailConfirmationStepContainer;