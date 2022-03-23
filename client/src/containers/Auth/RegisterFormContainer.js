import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import routes from "../../router/routes";
import RegistrationForm from "../../components/Auth/RegistrationForm";
import {
    checkEmailRequest,
    checkUsernameRequest,
    clearFlags,
    confirmEmailRequest,
    registerRequest
} from "../../redux/actions/actions";
import {useDispatch} from "react-redux";

const RegistrationFormContainer = () => {
    const [step, setStep] = useState(1);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = useCallback((values, {setSubmitting}) => {
        console.log("Very complicated api call" , values);
        setSubmitting(false);
        navigate(routes.landing);
    }, [navigate]);

    const requestRegistration = useCallback((values) => {
        dispatch(registerRequest({
            email: values.email,
            username: values.username,
            password: values.password,
            confirmationPassword: values.confirmationPassword
        }));
    }, [dispatch]);

    const confirmEmail = useCallback((values) => {
        console.log(values)

        dispatch(confirmEmailRequest({
            id: values.id,
            code: values.code
        }));
    }, [dispatch]);

    const checkIfEmailExists = useCallback((email) => {
        dispatch(checkEmailRequest({email}));
    }, [dispatch]);

    const checkIfUsernameExists = useCallback((username) => {
        dispatch(checkUsernameRequest({username}));
    }, [dispatch]);

    const nextStep = useCallback(() => {
        setStep(step => step + 1);
    }, [setStep]);

    const prevStep = useCallback(() => {
        setStep(step => step - 1);
    }, [setStep]);

    useEffect(() => {
        return () => {
          dispatch(clearFlags());
        };
    }, [dispatch]);

    return (
        <RegistrationForm
            handleSubmit={handleSubmit}
            requestRegistration={requestRegistration}
            confirmEmail={confirmEmail}
            step={step}
            nextStep={nextStep}
            prevStep={prevStep}
            checkIfEmailExists={checkIfEmailExists}
            checkIfUsernameExists={checkIfUsernameExists}
        />
    );
};

RegistrationFormContainer.propTypes = {

};

export default RegistrationFormContainer;