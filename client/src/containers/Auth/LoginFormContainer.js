import React, {useCallback, useState} from 'react';
import {useNavigate} from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";
import routes from "../../router/routes";

const LoginFormContainer = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const handleVisibilityChange = useCallback(() => {
        setIsPasswordVisible(prev => !prev);
    }, [setIsPasswordVisible]);

    const handleSubmit = useCallback((values, {setSubmitting}) => {
        console.log("COMPLEX API CALL");
        navigate(routes.landing);
    }, [navigate]);

    const handleNavigationToRegisterPage = useCallback(() => {
        navigate(routes.register);
    }, [navigate]);

    return (
        <LoginForm
            isPasswordVisible={isPasswordVisible}
            handleVisibilityChange={handleVisibilityChange}
            handleSubmit={handleSubmit}
            handleNavigationToRegisterPage={handleNavigationToRegisterPage}
        />
    );
};

LoginFormContainer.propTypes = {

};

export default LoginFormContainer;