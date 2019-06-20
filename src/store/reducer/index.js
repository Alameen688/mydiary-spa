

import { createContext } from 'react';

export const DispatchContext = createContext(null);

const useCombinedReducer = (rootReducer) => {
  // Global State
  const state = Object.keys(rootReducer).reduce(
    (acc, key) => ({ ...acc, [key]: rootReducer[key][0] }),
    {}
  );

  // Global dispatch
  const dispatch = action => Object.keys(rootReducer)
    .map(key => rootReducer[key][1])
    .forEach(fn => fn(action));

  return [state, dispatch];
};

export default useCombinedReducer;
