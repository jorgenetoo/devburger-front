import React from "react";
import { createBrowserRouter } from "react-router-dom";


import  {Home,Products, Login, Register, Cart  }  from '../containers'

import PrivateRoute from './private-route'


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
{
    path:'/carrinho',
    element: <Cart/>,
},
])