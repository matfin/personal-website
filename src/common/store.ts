/* istanbul ignore file */
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import listState from 'app/components/list/reducer';
import storyState from 'app/components/story/reducer';

const rootReducer = combineReducers({
  listState, storyState,
});

export const createStoreWithPreloadedState = (preloadedState?: any) => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunkMiddleware),
);

export default createStoreWithPreloadedState;
