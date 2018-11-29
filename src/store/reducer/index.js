import { combineReducers } from 'redux';
import signUp from './auth/signUp';

const rootReducer = combineReducers({
  signUp
});

export default rootReducer;
