import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import IdentificationStep from "../../components/Auth/RegistrationForm/Steps/IdentificationStep";

const IdentificationStepContainer = ({setUser, nextStep}) => {
    const handleEmailChange = useCallback((e) => {
        setUser(user => {
            return {
                ...user,
                email: e.target.value
            }
        });
    }, [setUser]);

    const handleUsernameChange = useCallback((e) => {
        setUser(user => {
            return {
                ...user,
                userName: e.target.value
            }
        });
    }, [setUser]);

    return (
        <IdentificationStep
            nextStep={nextStep}
            onEmailChange={handleEmailChange}
            onUsernameChange={handleUsernameChange}
        />
    );
};

IdentificationStepContainer.propTypes = {
    nextStep: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired
};

export default IdentificationStepContainer;