import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SignUp = ({
  email, fullname, password, confirmPassword, onClick, onChange, errors
}) => (
  <main className='others auth__body'>
    <div className="auth__box">
      <h1>Create an account</h1>
      {errors && errors.length ? <div id="error-box"><ul id="error-msg">{errors.map((error, index) => (<li key={index}>{error}</li>))}</ul></div> : null}
      <form>
        <div className="textbox">
          <i className="fa fa-user" aria-hidden="true"></i>
          <input type="text" placeholder="Full Name" name="fullname" value={fullname} onChange={onChange} aria-hidden="true" />
        </div>
        <div className="textbox">
          <i className="fa fa-envelope" aria-hidden="true"></i>
          <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="textbox">
          <i className="fa fa-lock" aria-hidden="true"></i>
          <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} />
        </div>
        <div className="textbox">
          <i className="fa fa-lock" aria-hidden="true"></i>
          <input type="password" placeholder="Confirm password" name="confirmPassword" value={confirmPassword} onChange={onChange} />
        </div>
        <input type="submit" value="Sign Up" className="form__btn btn-register" onClick={onClick} />
        <div className="link">
          <p>Already have an account? <Link to='/login'>Login</Link></p>
        </div>
      </form>
    </div>

  </main>
);

SignUp.propTypes = {
  email: PropTypes.string.isRequired,
  fullname: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.array,
};


export default SignUp;
