import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import IdentificationStep from "../../../components/Auth/RegistrationForm/Steps/IdentificationStep";
import {
    selectIsCheckingProcessing,
    selectUserWithEmailExists,
    selectUserWithUsernameExists
} from "../../../redux/selectors";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import routes from "../../../router/routes";
import {startValidating} from "../../../redux/actions/actions";

const IdentificationStepContainer = ({handleChange, handleBlur, nextStep, values, touched, errors, checkIfEmailExists, checkIfUsernameExists}) => {
    const userWithEmailExists = useSelector(state => selectUserWithEmailExists(state));
    const userWithUsernameExists = useSelector(state => selectUserWithUsernameExists(state));
    const isCheckingProcessing = useSelector(state => selectIsCheckingProcessing(state));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(startValidating());

        const timer = setTimeout(() => {
            if (touched.email && !errors.email) {
                checkIfEmailExists(values.email);
            }
        }, 500);

        return () => {
            clearTimeout(timer);
        }
    }, [touched.email, errors.email, checkIfEmailExists, values.email]);

    useEffect(() => {
        dispatch(startValidating());

        const timer = setTimeout(() => {
            if (touched.username && !errors.username) {
                checkIfUsernameExists(values.username);
            }
        }, 500);

        return () => {
            clearTimeout(timer);
        }
    }, [touched.username, errors.username, checkIfUsernameExists, values.username]);

    const navigateToLoginPage = useCallback(() => {
        navigate(routes.login);
    }, []);

    return (
        <IdentificationStep
            nextStep={nextStep}
            handleChange={handleChange}
            handleEmailBlur={handleBlur}
            handleUsernameBlur={handleBlur}
            values={values}
            errors={errors}
            touched={touched}
            areInputsInvalid={!touched.email || !touched.username ||
                errors.username !== undefined || errors.email !== undefined ||
                userWithUsernameExists || userWithEmailExists || isCheckingProcessing}
            userWithEmailExists={userWithEmailExists}
            userWithUsernameExists={userWithUsernameExists}
            navigateToLoginPage={navigateToLoginPage}
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