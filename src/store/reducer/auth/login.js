import {
  LOGIN, LOGOUT, SHOW_LOGIN_ERROR, CLEAR_LOGIN_ERROR, LOGIN_LOADING
} from '../../constant/auth';


export const initialLogin = {
  loading: false
};

export const login = (state = initialLogin, action = {}) => {
  const { type, errors, user } = action;
  switch (type) {
    case LOGIN_LOADING:
      return {
        ...state, loading: true
      };
    case LOGIN:
      return {
        ...state, user, loading: false
      };
    case LOGOUT:
      return {
        ...initialLogin
      };
    case SHOW_LOGIN_ERROR:
      return {
        ...state,
        errors
      };
    case CLEAR_LOGIN_ERROR:
      return {
        ...state,
        errors
      };
    default:
      return state;
  }
};
