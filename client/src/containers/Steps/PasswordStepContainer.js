import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import PasswordStep from "../../components/Auth/RegistrationForm/Steps/PasswordStep";

const PasswordStepContainer = ({setUser, nextStep, prevStep}) => {
    const handlePasswordChange = useCallback((e) => {
        setUser(user => {
            return {
                ...user,
                password: e.target.value
            }
        });
    }, [setUser]);

    return (
        <PasswordStep
            nextStep={nextStep}
            prevStep={prevStep}
            onPasswordChange={handlePasswordChange}
        />
    );
};

PasswordStepContainer.propTypes = {
    nextStep: PropTypes.func.isRequired,
    prevStep: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired
};

export default PasswordStepContainer;