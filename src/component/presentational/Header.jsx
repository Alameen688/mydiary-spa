import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ isLoggedIn, logout, children }) => {
  const links = isLoggedIn ? (<>
    <a href="/" className="nav-item" onClick={logout}>Logout</a>
  </>) : (<>
    <Link to='/signup' className="nav-item">Register</Link>
    <Link to='/login' className="nav-item" id="login">Login</Link>
  </>);
  return (
    <header>
      <nav>
        <div id="site-name">
          <Link to='/'>MyDiary</Link>
        </div>
        <div className="nav-links">
          {links}
        </div>
      </nav>
      { children }
    </header>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  children: PropTypes.object,
};
export default Header;
