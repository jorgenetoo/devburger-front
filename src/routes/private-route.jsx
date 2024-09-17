import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Header } from "../components";

function PrivateRoute({ component, ...rest }) {
    const user = localStorage.getItem('codeburger:userData');

if (!user) {
    return <Redirect to='/login'/>
}

return(
    <>
    <Header />
    <Route {...rest} component = {component}/>
    </>
)
}


    //     return user ? 
    
//     <Component {...rest} /> :
//     <>
//     <Header/> <Navigate to="/login" replace />;
//     </>
// }

export default PrivateRoute;

PrivateRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])}
