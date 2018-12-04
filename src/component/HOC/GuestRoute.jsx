import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import HeaderComponent from '../container/Header';

export const GuestRoute = ({ isLoggedIn, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      props => (
        !isLoggedIn ? <React.Fragment><HeaderComponent/><Component {...props} /></React.Fragment> : <Redirect to='/entries' />
      )
    } />
);

const mapStateToProps = state => ({
  isLoggedIn: state.login.user
});

export default connect(mapStateToProps)(GuestRoute);
