import React, {useCallback, useState} from 'react';
import ApplicationBar from "../components/ApplicationBar";
import {useNavigate} from "react-router-dom";

const ApplicationBarContainer = () => {
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);
    const navigate = useNavigate();

    const handleNavigation = useCallback((path) => {
        navigate(path);
    }, [navigate]);

    return (
        <ApplicationBar
            onNavigate = {handleNavigation}
            isDrawerOpened = {isDrawerOpened}
            setIsDrawerOpened = {setIsDrawerOpened}
        />
    );
};

export default ApplicationBarContainer;