import {
  CREATE_ENTRY,
  SHOW_CREATE_ERROR,
  CLEAR_CREATE_ERROR,
  CLEAR_CREATE_RESPONSE
} from '../../constant/entry';

const initialState = {
  loading: false
};

export default (state = initialState, action) => {
  const {
    type,
    errors,
    statusCode,
    message,
    entryId
  } = action;
  switch (type) {
    case CREATE_ENTRY:
      return {
        ...state, statusCode, message, entryId
      };
    case SHOW_CREATE_ERROR:
      return { ...state, errors };
    case CLEAR_CREATE_ERROR:
      return { ...state, errors };
    case CLEAR_CREATE_RESPONSE:
      return {
        ...state,
        statusCode,
        message,
        entryId
      };
    default:
      return state;
  }
};
