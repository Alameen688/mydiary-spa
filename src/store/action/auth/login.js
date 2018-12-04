import Axios from '../../../services/axios';
import {
  LOGIN, LOGOUT, SHOW_LOGIN_ERROR, CLEAR_LOGIN_ERROR, LOGIN_LOADING
} from '../../constant/auth';

export const showError = errors => ({
  type: SHOW_LOGIN_ERROR,
  errors
});

export const clearError = () => ({
  type: CLEAR_LOGIN_ERROR
});

export const loginSuccessful = user => ({
  type: LOGIN,
  user
});

export const login = loginData => async (dispatch) => {
  dispatch({
    type: LOGIN_LOADING
  });
  try {
    const result = await Axios.login(loginData);
    const { data } = result;
    const { data: response } = data;
    localStorage.setItem('mydiaryInfo', JSON.stringify(response));
    Axios.setToken(response.token);
    dispatch(loginSuccessful(response));
    return response;
  } catch (error) {
    let errors = [];
    const { message } = error;
    if (message && message === 'Network Error') {
      errors = ['Unable to connect to the internet'];
    } else {
      // if no errors array from server use message object
      const { data } = error.response;
      const { message: errorMessage } = data;
      errors = data.errors ? data.errors : [errorMessage];
    }
    dispatch(showError(errors));
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('mydiaryInfo');
  dispatch({
    type: LOGOUT
  });
};
