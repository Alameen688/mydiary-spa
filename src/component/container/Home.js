import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import LandingPage from '../presentational/LandingPage.jsx';
import { DispatchContext } from '../../store/reducer';

export const Home = () => {
  const { state: { login: { user } } } = useContext(DispatchContext);
  const isLoggedIn = !!user;
  const component = !isLoggedIn ? <LandingPage /> : <Redirect to='/entries' />;
  return component;
};

Home.propTypes = {
  isLoggedIn: PropTypes.bool,
};


export default Home;
