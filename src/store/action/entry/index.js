import {
  GET_ENTRIES,
  GET_ENTRY,
  LOADING_ENTRIES,
  CREATE_ENTRY_LOADING,
  CREATE_ENTRY,
  UPDATE_ENTRY,
  UPDATE_ENTRY_LOADING,
  SHOW_CREATE_ERROR,
  CLEAR_CREATE_ERROR,
  CLEAR_CREATE_RESPONSE,
  SHOW_UPDATE_ERROR,
  CLEAR_UPDATE_ERROR,
  CLEAR_UPDATE_RESPONSE,
  SHOW_ENTRIES_ERROR,
  GET_ENTRY_LOADING,
  SHOW_ENTRY_ERROR
} from '../../constant/entry';
import Axios from '../../../services/axios';

const deriveError = (error) => {
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
  return errors;
};

/**
 * NewEntry actions
 */

export const showCreateError = errors => ({
  type: SHOW_CREATE_ERROR,
  errors
});

export const clearCreateError = () => ({
  type: CLEAR_CREATE_ERROR
});

export const entryCreated = response => ({
  type: CREATE_ENTRY,
  ...response
});

export const clearCreateResponse = () => (
  {
    type: CLEAR_CREATE_RESPONSE
  }
);

export const createEntry = entry => async (dispatch) => {
  dispatch({
    type: CREATE_ENTRY_LOADING
  });
  try {
    const result = await Axios.createEntry(entry);
    const { data, status } = result;
    const { data: newEntry } = data;
    const response = {
      statusCode: status,
      message: 'Successfully created your diary entry',
      entryId: newEntry.id
    };
    dispatch(entryCreated(response));
    return { status, entryId: newEntry.id };
  } catch (error) {
    const errors = deriveError(error);
    dispatch(showCreateError(errors));
  }
};

/**
 * NewEntry actions
 */

export const showUpdateError = errors => ({
  type: SHOW_UPDATE_ERROR,
  errors
});

export const clearUpdateError = () => ({
  type: CLEAR_UPDATE_ERROR
});

export const entryUpdated = response => ({
  type: UPDATE_ENTRY,
  ...response
});

export const clearUpdateResponse = () => (
  {
    type: CLEAR_UPDATE_RESPONSE
  }
);

export const updateEntry = (id, entry) => async (dispatch) => {
  dispatch({
    type: UPDATE_ENTRY_LOADING
  });
  try {
    const result = await Axios.updateEntry(id, entry);
    const { data, status } = result;
    const { data: editedEntry } = data;
    const response = {
      statusCode: status,
      message: 'Successfully updated your diary entry',
      entryId: editedEntry.id
    };
    dispatch(entryUpdated(response));
    return { status, entryId: editedEntry.id };
  } catch (error) {
    const errors = deriveError(error);
    dispatch(showUpdateError(errors));
  }
};

/**
 * EntryList actions
 */
export const showEntriesError = errors => ({
  type: SHOW_ENTRIES_ERROR,
  errors
});

export const entriesRetrieved = response => ({
  type: GET_ENTRIES,
  response
});
export const getEntries = () => async (dispatch) => {
  dispatch({
    type: LOADING_ENTRIES
  });
  try {
    const result = await Axios.getEntries();
    const { data, status } = result;
    const { data: entries } = data;
    const response = {
      statusCode: status,
      message: 'Successfully retrieved your diary entries',
      entries
    };
    dispatch(entriesRetrieved(response));
  } catch (error) {
    const errors = deriveError(error);
    dispatch(showEntriesError(errors));
  }
};

/**
 * EntryView actions
 */

export const showEntryError = errors => ({
  type: SHOW_ENTRY_ERROR,
  errors
});

export const entryRetrieved = response => ({
  type: GET_ENTRY,
  response
});

export const getEntry = id => async (dispatch) => {
  dispatch({
    type: GET_ENTRY_LOADING
  });
  try {
    const result = await Axios.getEntryById(id);
    const { data, status } = result;
    const { data: entry } = data;
    const response = {
      statusCode: status,
      message: 'Successfully retrieved your diary entry',
      entry
    };
    dispatch(entryRetrieved(response));
    return status;
  } catch (error) {
    const errors = deriveError(error);
    dispatch(showEntryError(errors));
  }
};
