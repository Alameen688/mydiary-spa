import {
  UPDATE_ENTRY,
  SHOW_UPDATE_ERROR,
  CLEAR_UPDATE_RESPONSE,
  CLEAR_UPDATE_ERROR
} from '../../constant/entry';

export const initialUpdateEntry = {
  loading: false,
};

export const updateEntry = (state = initialUpdateEntry, action) => {
  const {
    type,
    errors,
    statusCode,
    message,
    entryId
  } = action;
  switch (type) {
    case UPDATE_ENTRY:
      return {
        ...state,
        statusCode,
        message,
        entryId
      };
    case SHOW_UPDATE_ERROR:
      return { ...state, errors };
    case CLEAR_UPDATE_ERROR:
      return { ...state, errors };
    case CLEAR_UPDATE_RESPONSE:
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
