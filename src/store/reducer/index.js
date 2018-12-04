import { combineReducers } from 'redux';
import signUp from './auth/signUp';
import login from './auth/login';

const rootReducer = combineReducers({
  signUp, login
});

export default rootReducer;
