import { combineReducers } from 'redux';
import login from './auth/login';
import signUp from './auth/signUp';
import entry from './entry/entry';
import entries from './entry/entries';
import createEntry from './entry/createEntry';
import updateEntry from './entry/updateEntry';

const rootReducer = combineReducers({
  signUp, login, entries, entry, createEntry, updateEntry
});

export default rootReducer;
