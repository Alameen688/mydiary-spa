import {
  SIGN_UP_LOADING,
  SHOW_SIGNUP_ERROR,
  CLEAR_SIGNUP_ERROR,
  SIGNED_UP
} from '../../constant/auth';

const initialState = {
  loading: false,
};

const signUp = (state = initialState, action = {}) => {
  const { type, statusCode, errors } = action;
  switch (type) {
    case SIGN_UP_LOADING:
      return {
        ...state, loading: true
      };
    case SIGNED_UP:
      return {
        ...state, statusCode, loading: false
      };
    case SHOW_SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        errors
      };
    case CLEAR_SIGNUP_ERROR:
      return {
        ...state,
        errors
      };
    default:
      return state;
  }
};

export default signUp;
