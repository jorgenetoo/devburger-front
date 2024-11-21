import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { Home, Products, Login, Register, Cart , Admin} from '../containers';
import PrivateRoute from './private-route';
import paths from "../constants/paths";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/cadastro',
        element: <Register />,
    },
    {
        path: '/',
        element: <PrivateRoute />,
        children: [
            {
                path: 'produtos',
                element: <Products />,
            },
            {
                path: 'carrinho',
                element: <Cart />,
            },

            {
                path: paths.Order, 
                isAdmin:true,
                element: <Admin />,
            },
            {
                path: paths.Products, 
                isAdmin:true,
                element: <Admin />,
            },
            {
                path: paths.NewProduct, 
                isAdmin:true,
                element: <Admin />,
            },
            {
                path: paths.EditProduct, 
                isAdmin:true,
                element: <Admin />,
            },
            
        ],
    },
]);