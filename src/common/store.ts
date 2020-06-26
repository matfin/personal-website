import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { appState } from 'app/reducer';
import { pageState } from 'app/views/page/reducer';

const rootReducer = combineReducers({
  appState,
  pageState,
});

export const createStoreWithPreloadedState = (preloadedState?: any) => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunkMiddleware),
);

export const clientSideStore = () => createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware),
);

export default createStoreWithPreloadedState;
