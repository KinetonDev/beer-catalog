import React from 'react';
import { Outlet } from 'react-router-dom';
import ApplicationBarContainer from "../containers/ApplicationBarContainer";

const WithAppBar = () => {
    return (
        <>
            <ApplicationBarContainer/>
            <Outlet/>
        </>
    );
};

export default WithAppBar;