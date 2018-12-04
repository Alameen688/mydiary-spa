import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../store/action/auth/login';
import HeaderView from '../presentational/Header.jsx';

export class Header extends Component {
  render() {
    const { user, logout: logoutHandler } = this.props;
    return (
      <HeaderView isLoggedIn={!!user} logout={logoutHandler}>
        { this.props.children }
      </HeaderView>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  children: PropTypes.object,
};
const mapDispatchToProps = {
  logout
};
const mapStateToProps = state => ({
  user: state.login.user
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
