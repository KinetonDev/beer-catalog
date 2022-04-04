import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {selectIsAuth} from "../redux/selectors";
import {useDispatch, useSelector} from "react-redux";
import {Outlet, Navigate} from "react-router-dom";
import routes from "./routes";
import {getMeRequest} from "../redux/actions/actions";

const PrivateRoute = ({}) => {
    const isAuth = useSelector(state => selectIsAuth(state));
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuth) {
            dispatch(getMeRequest());
        }
    }, [isAuth]);

    return isAuth ? <Outlet/> : <Navigate to={routes.login} replace/>;
};

PrivateRoute.propTypes = {

};

export default PrivateRoute;