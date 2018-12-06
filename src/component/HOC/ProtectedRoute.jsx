import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ isLoggedIn, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      props => (
        isLoggedIn ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    } />
);

const mapStateToProps = state => ({
  isLoggedIn: state.login.user
});

export default connect(mapStateToProps)(ProtectedRoute);
