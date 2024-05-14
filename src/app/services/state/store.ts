import {
  configureStore,
  Dispatch,
  Action,
  Store,
  ThunkDispatch,
} from '@reduxjs/toolkit';

import pageSlice from './page';
import appSlice from './app';

const rootReducer: RootState = {
  page: pageSlice,
  app: appSlice,
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
