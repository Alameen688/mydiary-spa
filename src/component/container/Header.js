import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DispatchContext } from '../../store/reducer';
import { logout } from '../../store/action/auth/login';
import HeaderView from '../presentational/Header.jsx';

const Header = ({ children }) => {
  const { state: { login: { user } }, dispatch } = useContext(DispatchContext);
  const logoutHandler = () => logout()(dispatch);
  return (
      <HeaderView isLoggedIn={!!user} logout={logoutHandler}>
        { children }
      </HeaderView>
  );
};

Header.propTypes = {
  children: PropTypes.object,
};
export default Header;
