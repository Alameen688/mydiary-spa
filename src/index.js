import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import store from './store';

const app = (
  <Provider store={store}>
    <App/>
  </Provider>
);
const container = document.getElementById('root');
ReactDOM.render(app, container);
