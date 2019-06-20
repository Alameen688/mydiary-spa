import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { DispatchContext } from '../../store/reducer';
import LoginView from '../presentational/Login.jsx';
import { login, showError, clearError } from '../../store/action/auth/login';
import { loginConstraint } from '../../utils/constraints/auth';
import Aux from '../HOC/Aux.jsx';
import '../../asset/styles/auth.scss';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state: { login: { errors } }, dispatch } = useContext(DispatchContext);

  const changeHandler = (event) => {
    if (errors && errors.length) {
      clearError()(dispatch);
    }
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };

  const clickHandler = (event) => {
    event.preventDefault();
    const fields = {
      email,
      password
    };
    const fieldErrors = validate(fields, loginConstraint);
    if (fieldErrors) {
      const errorsArray = Object.keys(fieldErrors).map(key => fieldErrors[key][0]);
      showError(errorsArray)(dispatch);
    } else {
      login(fields)(dispatch)
        .then((response) => {
          if (response.token) {
            history.push('/entries');
          }
        });
    }
  };

  return (
      <Aux>
        <LoginView
          email={email}
          password={password}
          onClick={clickHandler}
          onChange={changeHandler}
          errors={errors}
        />
      </Aux>
  );
};

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Login;
