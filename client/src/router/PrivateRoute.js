import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {selectIsAuth} from "../redux/selectors";
import {useSelector} from "react-redux";
import {Outlet, useNavigate} from "react-router-dom";
import routes from "./routes";

const PrivateRoute = ({}) => {
    const isAuth = useSelector(state => selectIsAuth(state));
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate(routes.login);
        }
    }, [isAuth]);

    return (
        <>
            <Outlet/>
        </>
    );
};

PrivateRoute.propTypes = {

};

export default PrivateRoute;