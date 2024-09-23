import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Header } from "../components";

function PrivateRoute({isAdmin,...rest}) {
    const user = localStorage.getItem('codeburger:userData');

    if (!user) {
        return <Navigate to="/login" replace />;
    }
if(isAdmin && !JSON.parse(user).admin) {
    return <Navigate to="/" replace />;
}

    return (
        <>
            {!isAdmin && <Header />}
            <Outlet />
        </>
    );
}

PrivateRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    isAdmin: PropTypes.bool
};

export default PrivateRoute;