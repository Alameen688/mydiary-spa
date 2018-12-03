import signUpReducer from '../../src/store/reducer/auth/signUp';
import {
  SIGN_UP_LOADING,
  SIGNED_UP,
  SHOW_SIGNUP_ERROR,
  CLEAR_SIGNUP_ERROR
} from '../../src/store/constant/auth';

const initialState = { loading: false };
describe('Signup reducer', () => {
  it('should return the initial state when action type is not handled', () => {
    const action = { type: 'UNHANDLED_ACTION' };
    const state = signUpReducer(undefined, action);
    expect(state).toEqual(initialState);
  });
  it('should handle SIGN_UP_LOADING action correctly', () => {
    const action = { type: SIGN_UP_LOADING };
    const state = signUpReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  it('should handle SIGNED_UP action correctly', () => {
    const response = { statusCode: 201 };
    const action = { type: SIGNED_UP, ...response };
    const state = signUpReducer(initialState, action);
    expect(state).toEqual({ ...initialState, ...response, loading: false });
  });
  it('should handle SHOW_SIGNUP_ERROR action correctly', () => {
    const errors = ['An account will this email already exists'];
    const action = { type: SHOW_SIGNUP_ERROR, errors };
    const state = signUpReducer(initialState, action);
    expect(state).toEqual({ ...initialState, errors, loading: false });
  });
  it('should handle CLEAR_SIGNUP_ERROR action correctly', () => {
    const action = { type: CLEAR_SIGNUP_ERROR };
    const state = signUpReducer(initialState, action);
    expect(state).toEqual({ ...initialState, errors: undefined, loading: false });
  });
});
