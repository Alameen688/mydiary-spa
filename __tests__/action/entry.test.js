import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Axios from '../../src/services/axios';
import * as actions from '../../src/store/action/entry';
import * as types from '../../src/store/constant/entry';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ articles: {} });

const networkErrorResponse = {
  status: 511,
  message: 'Network Error',
  response: {
    status: 'error'
  }
};
const createSuccessResponse = {
  status: 200,
  response: {
    status: 'success',
    message: 'Successfully created your diary entry',
    data: { id: 1 },
  }
};
const updateSuccessResponse = {
  status: 200,
  response: {
    status: 'success',
    message: 'Successfully updated your diary entry',
    data: { id: 1 },
  }
};
const getEntriesSuccessResponse = {
  status: 200,
  data: { entries: [] },
  response: {
    status: 'success',
    message: 'Successfully retrieved your diary entries',
  }
};
const getEntrySuccessResponse = {
  status: 200,
  data: { entry: {} },
  response: {
    status: 'success',
    message: 'Successfully retrieved your diary entry',
  }
};
const entryErrorResponse = {
  status: 500,
  response: {
    data: {
      status: 'error',
      message: 'Internal server error',
    }
  }
};
describe('entry actions', () => {
  const axiosInstance = Axios.getInstance();
  beforeEach(() => {
    store.clearActions();
    moxios.install(axiosInstance);
  });
  afterEach(() => {
    moxios.uninstall(axiosInstance);
  });
  it('should dispatch the actions LOADING_ENTRIES and GET_ENTRIES on getEntries success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(getEntriesSuccessResponse);
    });
    return store.dispatch(actions.getEntries()).then(() => {
      const { message, entries } = getEntriesSuccessResponse.response;
      const action = store.getActions();
      expect(action.length).toBe(2);
      expect(action[0]).toEqual({ type: types.LOADING_ENTRIES });
      expect(action[1]).toEqual({
        type: types.GET_ENTRIES,
        response: { statusCode: getEntriesSuccessResponse.status, message, entries }
      });
    });
  });
  it('should dispatch the actions LOADING_ENTRIES and SHOW_ENTRIES_ERROR on getEntries failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(entryErrorResponse);
    });
    return store.dispatch(actions.getEntries()).then(() => {
      const action = store.getActions();
      expect(action.length).toBe(2);
      expect(action[0]).toEqual({ type: types.LOADING_ENTRIES });
      expect(action[1]).toEqual({
        type: types.SHOW_ENTRIES_ERROR,
        errors: ['Internal server error']
      });
    });
  });
  it('should dispatch the actions GET_ENTRY_LOADING and GET_ENTRY on getEntry success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(getEntrySuccessResponse);
    });
    return store.dispatch(actions.getEntry()).then(() => {
      const { message, entries } = getEntrySuccessResponse.response;
      const action = store.getActions();
      expect(action.length).toBe(2);
      expect(action[0]).toEqual({ type: types.GET_ENTRY_LOADING });
      expect(action[1]).toEqual({
        type: types.GET_ENTRY,
        response: { statusCode: getEntrySuccessResponse.status, message, entries }
      });
    });
  });
  it('should dispatch the actions GET_ENTRY_LOADING and SHOW_ENTRY_ERROR on getEntry failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(entryErrorResponse);
    });
    return store.dispatch(actions.getEntry()).then(() => {
      const action = store.getActions();
      expect(action.length).toBe(2);
      expect(action[0]).toEqual({ type: types.GET_ENTRY_LOADING });
      expect(action[1]).toEqual({
        type: types.SHOW_ENTRY_ERROR,
        errors: ['Internal server error']
      });
    });
  });
  it('should dispatch the actions CREATE_ENTRY_LOADING and CREATE_ENTRY on createEntry success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(createSuccessResponse);
    });
    return store.dispatch(actions.createEntry({})).then(() => {
      const { message, data } = createSuccessResponse.response;
      const action = store.getActions();
      expect(action.length).toBe(2);
      expect(action[0]).toEqual({ type: types.CREATE_ENTRY_LOADING });
      expect(action[1]).toEqual({
        type: types.CREATE_ENTRY,
        statusCode: createSuccessResponse.status,
        message,
        entryId: data.id
      });
    });
  });
  it('should dispatch the actions CREATE_ENTRY_LOADING and SHOW_CREATE_ERROR on createEntry network failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(networkErrorResponse);
    });
    return store.dispatch(actions.createEntry({})).then(() => {
      const action = store.getActions();
      expect(action.length).toBe(2);
      expect(action[0]).toEqual({ type: types.CREATE_ENTRY_LOADING });
      expect(action[1]).toEqual({
        type: types.SHOW_CREATE_ERROR,
        errors: ['Unable to connect to the internet']
      });
    });
  });
  it('should dispatch the actions CREATE_ENTRY_LOADING and CREATE_ENTRY on updateEntry success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(updateSuccessResponse);
    });
    return store.dispatch(actions.updateEntry({})).then(() => {
      const { message, data } = updateSuccessResponse.response;
      const action = store.getActions();
      expect(action.length).toBe(2);
      expect(action[0]).toEqual({ type: types.UPDATE_ENTRY_LOADING });
      expect(action[1]).toEqual({
        type: types.UPDATE_ENTRY,
        statusCode: updateSuccessResponse.status,
        message,
        entryId: data.id
      });
    });
  });
  it('should dispatch the actions CREATE_ENTRY_LOADING and SHOW_CREATE_ERROR on updateEntry error', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(entryErrorResponse);
    });
    return store.dispatch(actions.updateEntry({})).then(() => {
      const action = store.getActions();
      expect(action.length).toBe(2);
      expect(action[0]).toEqual({ type: types.UPDATE_ENTRY_LOADING });
      expect(action[1]).toEqual({
        type: types.SHOW_UPDATE_ERROR,
        errors: ['Internal server error']
      });
    });
  });
});
