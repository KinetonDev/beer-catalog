import React, {useCallback, useState} from 'react';
import ApplicationBar from "../components/ApplicationBar";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectLocale, selectUserRole} from "../redux/selectors";
import {changeLanguage} from "../redux/actions/actions";

const ApplicationBarContainer = () => {
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);
    const role = useSelector(state => selectUserRole(state));
    const currentLocale = useSelector(state => selectLocale(state));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNavigation = useCallback((path) => {
        navigate(path);
    }, [navigate]);
    
    const handleLanguageChange = useCallback(() => {
        dispatch(changeLanguage());
    }, [dispatch]);

    return (
        <ApplicationBar
            role={role}
            onNavigate = {handleNavigation}
            onLanguageChange={handleLanguageChange}
            isDrawerOpened = {isDrawerOpened}
            setIsDrawerOpened = {setIsDrawerOpened}
            currentLocale={currentLocale}
        />
    );
};

export default ApplicationBarContainer;