import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import LandingPage from '../presentational/LandingPage.jsx';

export class Home extends Component {
  render() {
    const { isLoggedIn } = this.props;
    const component = !isLoggedIn ? <LandingPage /> : <Redirect to='/entries' />;
    return component;
  }
}

Home.propTypes = {
  isLoggedIn: PropTypes.bool,
};

const mapStateToProps = state => (
  {
    isLoggedIn: state.login.user
  }
);


export default connect(mapStateToProps)(Home);
