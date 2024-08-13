import React from "react";
import { Redirect, Route } from 'react-router-dom'

import PropTypes from 'prop-types'

function PrivateRoute({componet,...rest}){
const user =  localStorage.getItem ('codeburger:userData')

if(!user){
    return <Redirect to="/login"/>
}
return <Route {...rest} component={componet}/>
}

export default PrivateRoute

PrivateRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
}