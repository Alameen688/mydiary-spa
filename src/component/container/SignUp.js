import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { DispatchContext } from '../../store/reducer';
import { signUp, showError, clearError } from '../../store/action/auth/signUp';
import { signUpConstraint } from '../../utils/constraints/auth';
import SignUpPage from '../presentational/SignUp.jsx';
import '../../asset/styles/auth.scss';

const initialFields = {
  email: '',
  fullname: '',
  password: '',
  confirmPassword: ''
};

const SignUp = ({ history }) => {
  const { state: { signUp: { errors } }, dispatch } = useContext(DispatchContext);

  const [fields, setFields] = useState(initialFields);

  const changeHandler = (event) => {
    if (errors && errors.length) {
      clearError()(dispatch);
    }
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const clickHandler = (event) => {
    event.preventDefault();
    const {
      email, fullname, password, confirmPassword
    } = fields;
    const formFields = {
      email,
      fullname,
      password,
      confirmPassword
    };
    const fieldErrors = validate(formFields, signUpConstraint);
    if (fieldErrors) {
      const errorsArray = Object.keys(fieldErrors).map(key => fieldErrors[key][0]);
      showError(errorsArray)(dispatch);
    } else {
      signUp(formFields)(dispatch)
        .then((statusCode) => {
          if (statusCode && statusCode === 201) {
            history.push('/login');
          }
        });
    }
  };

  const {
    email, fullname, password, confirmPassword
  } = fields;
  return (
        <SignUpPage
          email={email}
          fullname={fullname}
          password={password}
          confirmPassword={confirmPassword}
          onClick={clickHandler}
          onChange={changeHandler}
          errors={errors}/>
  );
};

SignUp.propTypes = {
  history: PropTypes.object.isRequired,
};

export default SignUp;
