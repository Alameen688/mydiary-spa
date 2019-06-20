import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import combinedReducers, { DispatchContext } from './store/reducer';

const [, dispatch] = combinedReducers;
const app = (
  <DispatchContext.Provider value={dispatch}>
    <App/>
  </DispatchContext.Provider>
);
const container = document.getElementById('root');
ReactDOM.render(app, container);
