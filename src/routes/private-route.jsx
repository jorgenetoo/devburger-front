import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Header } from '../components';

function PrivateRoute({ isAdmin }) {
  const user = localStorage.getItem('codeburger:userData');

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userData = JSON.parse(user);

  if (isAdmin && !userData.admin) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {!userData.admin && <Header />}
      <Outlet />
    </>
  );
}

PrivateRoute.propTypes = {
  isAdmin: PropTypes.bool,
};

export default PrivateRoute;