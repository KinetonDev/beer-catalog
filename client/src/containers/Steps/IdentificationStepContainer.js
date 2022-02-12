import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import IdentificationStep from "../../components/Auth/RegistrationForm/Steps/IdentificationStep";

const IdentificationStepContainer = (props) => {
    const onEmailChange = useCallback((e) => {

    }, [props.setUser]);

    return (
        <IdentificationStep
            nextStep={props.nextStep}
        />
    );
};

IdentificationStepContainer.propTypes = {
    nextStep: PropTypes.func.isRequired
};

export default IdentificationStepContainer;