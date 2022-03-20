import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import IdentificationStep from "../../../components/Auth/RegistrationForm/Steps/IdentificationStep";
import {selectUserWithEmailExists, selectUserWithUsernameExists} from "../../../redux/selectors";
import {useSelector} from "react-redux";

const IdentificationStepContainer = ({handleChange, handleBlur, nextStep, values, touched, errors, checkIfEmailExists, checkIfUsernameExists}) => {
    const userWithEmailExists = useSelector(state => selectUserWithEmailExists(state));
    const userWithUsernameExists = useSelector(state => selectUserWithUsernameExists(state));

    useEffect(() => {
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
        const timer = setTimeout(() => {
            if (touched.username && !errors.username) {
                checkIfUsernameExists(values.username);
            }
        }, 500);

        return () => {
            clearTimeout(timer);
        }
    }, [touched.username, errors.username, checkIfUsernameExists, values.username]);

    return (
        <IdentificationStep
            nextStep={nextStep}
            handleChange={handleChange}
            handleEmailBlur={handleBlur}
            handleUsernameBlur={handleBlur}
            values={values}
            errors={errors}
            touched={touched}
            areInputsInvalid={errors.username !== undefined || errors.email !== undefined || userWithUsernameExists || userWithEmailExists}
            userWithEmailExists={userWithEmailExists}
            userWithUsernameExists={userWithUsernameExists}
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