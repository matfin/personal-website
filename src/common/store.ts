/* istanbul ignore file */
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { pageState } from 'app/views/page/reducer';

const rootReducer = combineReducers({
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
