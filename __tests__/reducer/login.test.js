import loginReducer from '../../src/store/reducer/auth/login';
import {
  LOGIN_LOADING, LOGIN, SHOW_LOGIN_ERROR, CLEAR_LOGIN_ERROR, LOGOUT
} from '../../src/store/constant/auth';

const initialState = {
  loading: false
};

const user = {
  id: 3,
  fullname: 'Testing tester',
  email: 'testerhere@gt5y4354.com',
  fav_quote: null,
  token: 'mFtZSI6Ik9ndW5kaXJhbiBBZGVuaXlpIiwiZmF2X3F1b3RlIjoiU2zIGEgZ29hbCwgZmiOjE1NDQwMDkwNDF9i8bxCSZ6QRTcSl8YI'
};

describe('Login reducer', () => {
  it('should return the initial state when action type is not handled', () => {
    const action = { type: 'UNHANDLED_ACTION' };
    const state = loginReducer(undefined, action);
    expect(state).toEqual(initialState);
  });
  it('should handle LOGIN_LOADING successfully', () => {
    const action = { type: LOGIN_LOADING };
    const state = loginReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  it('should handle LOGIN action correctly', () => {
    const response = {
      statusCode: 200,
      user: {
        id: 3,
        fullname: 'Testing tester',
        email: 'testerhere@gt5y4354.com',
        fav_quote: null,
        token: 'mFtZSI6Ik9ndW5kaXJhbiBBZGVuaXlpIiwiZmF2X3F1b3RlIjoiU2zIGEgZ29hbCwgZmiOjE1NDQwMDkwNDF9i8bxCSZ6QRTcSl8YI'
      }
    };
    const action = { type: LOGIN, ...response };
    const state = loginReducer(initialState, action);
    expect(state).toEqual({ ...initialState, user: response.user, loading: false });
  });
  it('should handle SHOW_LOGIN_ERROR action correctly', () => {
    const errors = ['Email is not valid'];
    const action = { type: SHOW_LOGIN_ERROR, errors };
    const state = loginReducer(initialState, action);
    expect(state).toEqual({ ...initialState, errors, loading: false });
  });
  it('should handle CLEAR_LOGIN_ERROR action correctly', () => {
    const action = { type: CLEAR_LOGIN_ERROR };
    const state = loginReducer(initialState, action);
    expect(state).toEqual({ ...initialState, errors: undefined, loading: false });
  });
  it('should handle LOGOUT action correctly', () => {
    const action = { type: LOGOUT };
    const state = loginReducer({ ...initialState, user }, action);
    expect(state).toEqual({ ...initialState, user: undefined });
  });
});
