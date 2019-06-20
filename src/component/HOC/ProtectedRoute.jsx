import React, { useContext } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DispatchContext } from '../../store/reducer';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { state: { login: { user } } } = useContext(DispatchContext);
  const isLoggedIn = !!user;
  return (
  <Route
    {...rest}
    render={
      props => (
        isLoggedIn ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    } />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(ProtectedRoute);
