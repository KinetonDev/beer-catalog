import React, {useCallback, useState} from 'react';
import ApplicationBar from "../components/ApplicationBar";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUserRole} from "../redux/selectors";

const ApplicationBarContainer = () => {
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);
    const role = useSelector(state => selectUserRole(state));
    const navigate = useNavigate();

    const handleNavigation = useCallback((path) => {
        navigate(path);
    }, [navigate]);

    return (
        <ApplicationBar
            role={role}
            onNavigate = {handleNavigation}
            isDrawerOpened = {isDrawerOpened}
            setIsDrawerOpened = {setIsDrawerOpened}
        />
    );
};

export default ApplicationBarContainer;