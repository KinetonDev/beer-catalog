import React from 'react';
import { Outlet } from 'react-router-dom';

const WithoutAppBar = () => {
    return (
        <>
            <Outlet/>
        </>
    );
};

export default WithoutAppBar;