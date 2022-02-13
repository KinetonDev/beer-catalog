import React, {useCallback, useState} from 'react';
import {useNavigate} from "react-router-dom";
import routes from "../../router/routes";
import RegistrationForm from "../../components/Auth/RegistrationForm";

const RegistrationFormContainer = () => {
    const [step, setStep] = useState(1);

    const navigate = useNavigate();

    const handleSubmit = useCallback((values, {setSubmitting}) => {
        console.log("Very complicated api call" , values);
        setSubmitting(false);
        navigate(routes.landing);
    }, [navigate]);

    const nextStep = useCallback(() => {
        setStep(step => step + 1);
    }, [setStep]);

    const prevStep = useCallback(() => {
        setStep(step => step - 1);
    }, [setStep]);

    return (
        <RegistrationForm
            handleSubmit={handleSubmit}
            step={step}
            setStep={setStep}
            nextStep={nextStep}
            prevStep={prevStep}
        />
    );
};

RegistrationFormContainer.propTypes = {

};

export default RegistrationFormContainer;