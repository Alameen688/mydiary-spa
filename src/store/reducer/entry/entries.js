import { GET_ENTRIES } from '../../constant/entry';

const initialState = {
  entries: []
};

export default (state = initialState, action) => {
  const { type, response } = action;
  switch (type) {
    case GET_ENTRIES:
      return { ...state, ...response };
    default:
      return state;
  }
};
