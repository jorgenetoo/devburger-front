import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ component: Component, ...rest }) {
    const user = localStorage.getItem('codeburger:userData');

    return user ? <Component {...rest} /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;

PrivateRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
};