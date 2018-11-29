import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Axios from '../../src/services/axios';
import * as actions from '../../src/store/action/auth/signUp';
import * as types from '../../src/store/constant/auth';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ articles: {} });

const signUpInfo = {
  email: 'test@dsfsd.com',
  password: 'password'
};
const signUpSuccessResponse = {
  status: 201,
  response: {
    data: {
      status: 'success',
      message: 'Account has been created successfully',
    }
  }
};
const signUpErrorResponse = {
  status: 500,
  response: {
    data: {
      status: 'error',
      message: 'Internal server error',
    }
  }
};

const networkErrorResponse = {
  status: 511,
  message: 'Network Error',
  response: {
    status: 'error'
  }
};

describe('Comment actions', () => {
  const axiosInstance = Axios.getInstance();
  beforeEach(() => {
    store.clearActions();
    moxios.install(axiosInstance);
  });
  afterEach(() => {
    moxios.uninstall(axiosInstance);
  });
  it('should dispatch the actions SIGN_UP_LOADING and SIGNED_UP on signUp success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(signUpSuccessResponse);
    });
    return store.dispatch(actions.signUp(signUpInfo)).then(() => {
      const action = store.getActions();
      expect(action.length).toBe(2);
      expect(action[0]).toEqual({ type: types.SIGN_UP_LOADING });
      expect(action[1]).toEqual({
        response: signUpSuccessResponse.response.data,
        statusCode: signUpSuccessResponse.status,
        type: types.SIGNED_UP
      });
    });
  });
  it('should dispatch the actions SIGN_UP_LOADING and SHOW_SIGNUP_ERROR on signUp failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(signUpErrorResponse);
    });
    return store.dispatch(actions.signUp(signUpInfo)).then(() => {
      const action = store.getActions();
      expect(action.length).toBe(2);
      expect(action[0]).toEqual({ type: types.SIGN_UP_LOADING });
      expect(action[1]).toEqual({
        type: types.SHOW_SIGNUP_ERROR,
        errors: ['Internal server error']
      });
    });
  });
  it('should dispatch the actions SIGN_UP_LOADING and SHOW_SIGNUP_ERROR on signUp network failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(networkErrorResponse);
    });
    return store.dispatch(actions.signUp(signUpInfo)).then(() => {
      const action = store.getActions();
      expect(action.length).toBe(2);
      expect(action[0]).toEqual({ type: types.SIGN_UP_LOADING });
      expect(action[1]).toEqual({
        type: types.SHOW_SIGNUP_ERROR,
        errors: ['Unable to connect to the internet']
      });
    });
  });
});
