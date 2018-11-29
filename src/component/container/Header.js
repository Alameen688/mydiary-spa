import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderView from '../presentational/Header.jsx';

export class Header extends Component {
  render() {
    return (
      <HeaderView>
        { this.props.children }
      </HeaderView>
    );
  }
}

Header.propTypes = {
  children: PropTypes.object,
};
const mapDispatchToProps = {

};
const mapStateToProps = state => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
