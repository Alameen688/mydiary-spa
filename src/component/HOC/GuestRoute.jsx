import React, { useContext } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DispatchContext } from '../../store/reducer';
import HeaderComponent from '../container/Header';

export const GuestRoute = ({ component: Component, ...rest }) => {
  const { state: { login: { user } } } = useContext(DispatchContext);
  const isLoggedIn = !!user;
  return (<Route
    {...rest}
    render={
      props => (
        !isLoggedIn ? <><HeaderComponent/><Component {...props} /></> : <Redirect to='/entries' />
      )
    } />
  );
};
GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(GuestRoute);
