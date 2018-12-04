import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Axios from '../../src/services/axios';
import * as actions from '../../src/store/action/auth/login';
import * as types from '../../src/store/constant/auth';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ articles: {} });

const loginInfo = {
  email: 'test@dsfsd.com',
  password: 'password'
};
const user = {
  id: 3,
  fullname: 'Testing tester',
  email: 'test@dsfsd.com',
  fav_quote: null,
  token: 'mFtZSI6Ik9ndW5kaXJhbiBBZGVuaXdsgtnhrgetgr342qewrgethy435q4wesdNDQwMDkwNDF9i8bxCSZ6QRTcSl8YI'
};
const loginSuccessResponse = {
  status: 200,
  response: {
    status: 'success',
    data: user
  }
};
const loginErrorResponse = {
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

describe('Login actions', () => {
  const axiosInstance = Axios.getInstance();
  beforeEach(() => {
    store.clearActions();
    moxios.install(axiosInstance);
  });
  afterEach(() => {
    moxios.uninstall(axiosInstance);
  });
  it('should dispatch the actions LOGIN_LOADING and LOGIN on login success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(loginSuccessResponse);
    });
    return store.dispatch(actions.login(loginInfo)).then(() => {
      const action = store.getActions();
      expect(action.length).toBe(2);
      expect(action[0]).toEqual({ type: types.LOGIN_LOADING });
      expect(action[1]).toEqual({
        user: loginSuccessResponse.response.data,
        type: types.LOGIN
      });
    });
  });
  it('should dispatch the actions LOGIN_LOADING and SHOW_LOGIN_ERROR on login failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(loginErrorResponse);
    });
    return store.dispatch(actions.login(loginInfo)).then(() => {
      const action = store.getActions();
      expect(action.length).toBe(2);
      expect(action[0]).toEqual({ type: types.LOGIN_LOADING });
      expect(action[1]).toEqual({
        type: types.SHOW_LOGIN_ERROR,
        errors: ['Internal server error']
      });
    });
  });
  it('should dispatch the actions LOGIN_LOADING and SHOW_LOGIN_ERROR on login network failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(networkErrorResponse);
    });
    return store.dispatch(actions.login(loginInfo)).then(() => {
      const action = store.getActions();
      expect(action.length).toBe(2);
      expect(action[0]).toEqual({ type: types.LOGIN_LOADING });
      expect(action[1]).toEqual({
        type: types.SHOW_LOGIN_ERROR,
        errors: ['Unable to connect to the internet']
      });
    });
  });
  it('should dispatch the actions LOGOUT action on logout success', (done) => {
    store.dispatch(actions.logout());
    const action = store.getActions();
    expect(action.length).toBe(1);
    expect(action[0]).toEqual({ type: types.LOGOUT });
    done();
  });
});
