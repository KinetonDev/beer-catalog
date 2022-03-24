import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {selectIsAuth} from "../redux/selectors";
import {useDispatch, useSelector} from "react-redux";
import {Outlet, useNavigate} from "react-router-dom";
import routes from "./routes";
import {getMeRequest} from "../redux/actions/actions";

const PrivateRoute = ({}) => {
    const isAuth = useSelector(state => selectIsAuth(state));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate(routes.login);
        }
    }, [isAuth]);

    useEffect(() => {
        if (isAuth) {
            dispatch(getMeRequest());
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