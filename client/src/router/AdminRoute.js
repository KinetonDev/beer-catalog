import React from 'react';
import {Outlet, Navigate} from "react-router-dom";
import {selectUserRole} from "../redux/selectors";
import {useSelector} from "react-redux";
import {appRoles} from "../constants";
import routes from "./routes";

const AdminRoute = () => {
    const role = useSelector(state => selectUserRole(state));

    return (role.toLowerCase() === appRoles.admin) ?
        <Outlet/> : <Navigate to={routes.landing} replace/>;
};

export default AdminRoute;