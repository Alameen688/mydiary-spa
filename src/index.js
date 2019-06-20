import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import Routes from './App.jsx';
import { login, initialLogin } from './store/reducer/auth/login';
import { signUp, initialSignUp } from './store/reducer/auth/signUp';
import { entry, initialEntry } from './store/reducer/entry/entry';
import { entries, initialEntries } from './store/reducer/entry/entries';
import { createEntry, initialCreateEntry } from './store/reducer/entry/createEntry';
import { updateEntry, initialUpdateEntry } from './store/reducer/entry/updateEntry';
import useCombinedReducer, { DispatchContext } from './store/reducer';

const App = () => {
  const useReducers = {
    entry: useReducer(entry, initialEntry),
    entries: useReducer(entries, initialEntries),
    createEntry: useReducer(createEntry, initialCreateEntry),
    updateEntry: useReducer(updateEntry, initialUpdateEntry),
    login: useReducer(login, initialLogin),
    signUp: useReducer(signUp, initialSignUp),
  };
  const [state, dispatch] = useCombinedReducer(useReducers);

  return (<DispatchContext.Provider value={{ state, dispatch }}>
    <Routes/>
</DispatchContext.Provider>);
};

const container = document.getElementById('root');
ReactDOM.render(<App/>, container);
