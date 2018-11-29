import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './component/presentational/LandingPage.jsx';

import './asset/styles/app.scss';
import './asset/styles/entry.scss';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LandingPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}
