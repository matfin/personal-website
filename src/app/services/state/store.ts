import { configureStore, Store } from '@reduxjs/toolkit';

import pageSlice from './page';
import appSlice from './app';

const rootReducer: RootState = {
  page: pageSlice,
  app: appSlice,
};

export const store: Store = configureStore({
  reducer: rootReducer,
});

export const clientStore = (preloadedState: RootState): Store =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
