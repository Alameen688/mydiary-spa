import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
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

GuestRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(GuestRoute);
