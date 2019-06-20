import { GET_ENTRIES } from '../../constant/entry';

export const initialEntries = {
  entries: []
};

export const entries = (state = initialEntries, action) => {
  const { type, response } = action;
  switch (type) {
    case GET_ENTRIES:
      return { ...state, ...response };
    default:
      return state;
  }
};
