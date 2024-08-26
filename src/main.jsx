import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import { RouterProvider } from 'react-router-dom';
import GlobalStyles from './styles/globalStyles';
import { router } from './routes';
import { UserProvider } from './hooks/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router}>
        <GlobalStyles />
        <ToastContainer autoClose={2000} theme="colored" />
      </RouterProvider>
    </UserProvider>
  </React.StrictMode>,
);