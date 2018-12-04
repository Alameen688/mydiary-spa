import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Login = ({
  email, password, onClick, onChange, errors
}) => (
    <main className="others auth__body">
      <div className="auth__box">
        <h1>Login</h1>
          {errors && errors.length ? <div id="error-box"><ul id="error-msg">{errors.map((error, index) => (<li key={index}>{error}</li>))}</ul></div> : null}
        <form>
          <div className="textbox">
            <i className="fa fa-envelope" aria-hidden="true"></i>
            <input type="email" placeholder="Email" name="email" value={email} onChange={onChange}/>
          </div>
          <div className="textbox">
            <i className="fa fa-lock" aria-hidden="true"></i>
            <input type="password" placeholder="Password" name="password" value={password} onChange={onChange}/>
          </div>
          <input type="submit" value="Log in" className="form__btn btn__login" onClick={onClick} />
            <div className="link">
              <p>New user? <Link to='/signup' className="nav-item">Sign Up</Link></p>
            </div>
        </form>
      </div>
    </main>
);

Login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.array,
};

export default Login;
