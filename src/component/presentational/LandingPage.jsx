import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <main>
    <div className="landing">
      <div className="landing-text">
        <div className="landing-text-inner">
          <h1><Link to='/'>MyDiary</Link></h1>
          <h2>Hi, I&apos;m your dear diary and you can always tell me what happened.</h2>
          <div className="actions">
            <Link to='/signup' className="btn get-started">
              Get started
            </Link>
            <Link to='/login' className="btn login-btn">
              Log in
            </Link>

          </div>
        </div>
      </div>
      <div className="landing-image">
      </div>
    </div>
  </main>
);

export default LandingPage;
