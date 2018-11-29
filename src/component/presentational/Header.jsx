import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ children }) => (
    <header>
      <nav>
        <div id="site-name">
          <Link to='/'>MyDiary</Link>
        </div>
        <div className="nav-links">
          <Link to='/signup' className="nav-item">Register</Link>
          <Link to='/login' className="nav-item" id="login">Login</Link>
        </div>
      </nav>
      { children }
    </header>
);

Header.propTypes = {
  children: PropTypes.object,
};
export default Header;
