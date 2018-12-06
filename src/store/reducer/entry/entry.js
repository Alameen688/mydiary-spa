import { GET_ENTRY } from '../../constant/entry';

const initialState = {
  entry: {}
};

export default (state = initialState, action) => {
  const { type, response } = action;
  switch (type) {
    case GET_ENTRY:
      return { ...state, ...response };

    default:
      return state;
  }
};
