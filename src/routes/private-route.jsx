import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Header } from "../components";

function PrivateRoute() {
    const user = localStorage.getItem('codeburger:userData');

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

PrivateRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
};

export default PrivateRoute;