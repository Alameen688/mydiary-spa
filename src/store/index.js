import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';
import { loginSuccessful } from './action/auth/login';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const userInfo = localStorage.getItem('mydiaryInfo');
if (userInfo) {
  const user = JSON.parse(userInfo);
  store.dispatch(loginSuccessful(user));
}
export default store;
