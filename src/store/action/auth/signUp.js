import Axios from '../../../services/axios';
import {
  SIGNED_UP, SHOW_SIGNUP_ERROR, CLEAR_SIGNUP_ERROR, SIGN_UP_LOADING
} from '../../constant/auth';

export const showError = errors => ({
  type: SHOW_SIGNUP_ERROR,
  errors
});

export const clearError = () => ({
  type: CLEAR_SIGNUP_ERROR
});

export const signUpSuccessful = response => ({
  type: SIGNED_UP,
  ...response
});

export const signUp = signUpInfo => async (dispatch) => {
  dispatch({
    type: SIGN_UP_LOADING
  });
  try {
    const result = await Axios.signUp(signUpInfo);
    const { data, status } = result;
    const { data: userData } = data;
    const response = {
      response: userData,
      statusCode: status
    };
    dispatch(signUpSuccessful(response));
    return status;
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
