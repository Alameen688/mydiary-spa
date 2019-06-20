import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Protected from './component/HOC/ProtectedRoute.jsx';
import Guest from './component/HOC/GuestRoute.jsx';
import LoginComponent from './component/container/Login';
import SignupComponent from './component/container/SignUp';
import EntryListComponent from './component/container/EntryList';
import NewEntryComponent from './component/container/NewEntry';
import EditEntryComponent from './component/container/EditEntry';
import EntryComponent from './component/container/Entry';
import HomePage from './component/container/Home';
import './asset/styles/app.scss';
import './asset/styles/entry.scss';

const Routes = () => (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Guest path='/signup' component={SignupComponent} />
          <Guest path='/login' component={LoginComponent} />
          <Protected exact path='/entries' component={EntryListComponent} />
          <Protected exact path='/entry/new' component={NewEntryComponent} />
          <Protected path='/entry/edit/:id' component={EditEntryComponent} />
          <Protected path='/entry/:id' component={EntryComponent} />
        </Switch>
      </BrowserRouter>
);

export default Routes;
