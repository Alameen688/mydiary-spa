import { useReducer, createContext } from 'react';
import { login, initialLogin } from './auth/login';
import { signUp, initialSignUp } from './auth/signUp';
import { entry, initialEntry } from './entry/entry';
import { entries, initialEntries } from './entry/entries';
import { createEntry, initialCreateEntry } from './entry/createEntry';
import { updateEntry, initialUpdateEntry } from './entry/updateEntry';

export const DispatchContext = createContext(null);

const useCombinedReducer = (rootReducer) => {
  // Global State
  const state = Object.keys(rootReducer).reduce(
    (acc, key) => ({ ...acc, [key]: rootReducer[key][0] }),
    {}
  );

  // Global dispatch
  const dispatch = action => Object.keys(rootReducer)
    .map(key => rootReducer[key][1])
    .forEach(fn => fn(action));

  return [state, dispatch];
};

const useReducers = {
  entry: useReducer(entry, initialEntry),
  entries: useReducer(entries, initialEntries),
  createEntry: useReducer(createEntry, initialCreateEntry),
  updateEntry: useReducer(updateEntry, initialUpdateEntry),
  login: useReducer(login, initialLogin),
  signUp: useReducer(signUp, initialSignUp),
};

export default useCombinedReducer(useReducers);
