import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import Aux from '../HOC/Aux.jsx';
import HeaderContainer from './Header';
import { signUp, showError, clearError } from '../../store/action/auth/signUp';
import { signUpConstraint } from '../../utils/constraints/auth';
import SignUpPage from '../presentational/SignUp.jsx';
import '../../asset/styles/auth.scss';

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      fullname: '',
      password: '',
      confirmPassword: ''
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(event) {
    if (this.props.errors && this.props.errors.length) {
      this.props.clearError();
    }
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  clickHandler(event) {
    event.preventDefault();
    const {
      email, fullname, password, confirmPassword
    } = this.state;
    const fields = {
      email,
      fullname,
      password,
      confirmPassword
    };
    const errors = validate(fields, signUpConstraint);
    if (errors) {
      const errorsArray = Object.keys(errors).map(key => errors[key][0]);
      this.props.showError(errorsArray);
    } else {
      const { history } = this.props;
      this.props.signUp(fields)
        .then((statusCode) => {
          if (statusCode && statusCode === 201) {
            history.push('/login');
          }
        });
    }
  }

  render() {
    const {
      email, fullname, password, confirmPassword
    } = this.state;
    const { errors } = this.props;
    return (
      <Aux>
        <HeaderContainer />
        <SignUpPage
          email={email}
          fullname={fullname}
          password={password}
          confirmPassword={confirmPassword}
          onClick={this.clickHandler}
          onChange={this.changeHandler}
          errors={errors}/>
      </Aux>
    );
  }
}

SignUp.propTypes = {
  loading: PropTypes.bool.isRequired,
  signUp: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  errors: PropTypes.array,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    loading: state.signUp.loading,
    errors: state.signUp.errors,
  }
);
const mapDispatchToProps = {
  signUp,
  showError,
  clearError
};


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
