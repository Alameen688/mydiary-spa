import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import LoginView from '../presentational/Login.jsx';
import { login, showError, clearError } from '../../store/action/auth/login';
import { loginConstraint } from '../../utils/constraints/auth';
import Aux from '../HOC/Aux.jsx';
import '../../asset/styles/auth.scss';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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
    const { email, password } = this.state;
    const fields = {
      email,
      password
    };
    const errors = validate(fields, loginConstraint);
    if (errors) {
      const errorsArray = Object.keys(errors).map(key => errors[key][0]);
      this.props.showError(errorsArray);
    } else {
      const { history } = this.props;
      this.props.login(fields)
        .then((response) => {
          if (response.token) {
            history.push('/entries');
          }
        });
    }
  }

  render() {
    const { email, password } = this.state;
    const { errors } = this.props;
    return (
      <Aux>
        <LoginView
          email={email}
          password={password}
          onClick={this.clickHandler}
          onChange={this.changeHandler}
          errors={errors}
        />
      </Aux>
    );
  }
}

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  errors: PropTypes.array,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    loading: state.login.loading,
    errors: state.login.errors,
  }
);
const mapDispatchToProps = {
  login,
  showError,
  clearError
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
