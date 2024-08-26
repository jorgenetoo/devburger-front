import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { Login } from "../containers/login";
import { Register } from "../containers/Register";
import  Home  from '../containers/Home'
import PrivateRoute from './private-route'
import Products from "../containers/Products";

export const router = createBrowserRouter ([
    {
        path:'/',
        element: <Home/>,
    },
{
    path:'/login',
    element: <Login/>,
},
{
    path:'/cadastro',
    element: <Register/>,
},
{
    path:'/produtos',
    element: <Products/>,
},
])