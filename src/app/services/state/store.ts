import {
  configureStore,
  type Dispatch,
  type Action,
  type Store,
  type ThunkDispatch,
} from '@reduxjs/toolkit';

import pageSlice from './page/slice';

const rootReducer: RootState = {
  page: pageSlice,
};

export const store: Store = configureStore({
  reducer: rootReducer,
});

export const preloadedStore = (preloadedState: RootState): Store =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = Dispatch<Action> &
  ThunkDispatch<RootState, null, Action>;
