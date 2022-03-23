import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";
import routes from "../../router/routes";
import {clearFlags, loginRequest} from "../../redux/actions/actions";
import {useDispatch, useSelector} from "react-redux";
import {selectLoginError, selectLoginSucceeded, selectWasLoginRequested} from "../../redux/selectors";

const LoginFormContainer = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const loginSucceeded = useSelector(state => selectLoginSucceeded(state));
    const wasLoginRequested = useSelector(state => selectWasLoginRequested(state));
    const loginError = useSelector(state => selectLoginError(state));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleVisibilityChange = useCallback(() => {
        setIsPasswordVisible(prev => !prev);
    }, [setIsPasswordVisible]);

    const handleSubmit = useCallback((values, {setSubmitting}) => {
        dispatch(loginRequest(values));
    }, [navigate]);

    const handleNavigationToRegisterPage = useCallback(() => {
        navigate(routes.register);
    }, [navigate]);

    useEffect(() => {
        if (loginSucceeded && wasLoginRequested) {
            navigate(routes.landing);
        }
    }, [loginSucceeded, wasLoginRequested]);

    useEffect(() => {
        return () => {
            dispatch(clearFlags());
        };
    }, [dispatch]);

    return (
        <LoginForm
            isPasswordVisible={isPasswordVisible}
            handleVisibilityChange={handleVisibilityChange}
            handleSubmit={handleSubmit}
            handleNavigationToRegisterPage={handleNavigationToRegisterPage}
            loginError={loginError}
            wasLoginRequested={wasLoginRequested}
            loginSucceeded={loginSucceeded}
        />
    );
};

LoginFormContainer.propTypes = {

};

export default LoginFormContainer;