import { GET_ENTRY } from '../../constant/entry';

export const initialEntry = {
  entry: {}
};

export const entry = (state = initialEntry, action) => {
  const { type, response } = action;
  switch (type) {
    case GET_ENTRY:
      return { ...state, ...response };

    default:
      return state;
  }
};
