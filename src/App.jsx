import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Guest from './component/HOC/GuestRoute.jsx';
import LandingPage from './component/presentational/LandingPage.jsx';
import LoginComponent from './component/container/Login';
import SignupComponent from './component/container/SignUp';

import './asset/styles/app.scss';
import './asset/styles/entry.scss';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Guest path='/signup' component={SignupComponent} />
          <Guest path='/login' component={LoginComponent} />
        </Switch>
      </BrowserRouter>
    );
  }
}
