import {
  LOGIN, LOGOUT, SHOW_LOGIN_ERROR, CLEAR_LOGIN_ERROR, LOGIN_LOADING
} from '../../constant/auth';


const initialState = {
  loading: false
};

const login = (state = initialState, action = {}) => {
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
        ...initialState
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

export default login;
