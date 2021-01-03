import {
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  Store,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { AppReduxAction, CombinedAppState, PageReduxAction } from 'models';
import { appState } from 'app/reducer';
import { pageState } from 'app/views/page/reducer';

type ReduxAction = AppReduxAction | PageReduxAction;

const rootReducer: Reducer<CombinedAppState, ReduxAction> = combineReducers({
  appState,
  pageState,
});

export const createStoreWithPreloadedState = (
  preloadedState?: CombinedAppState
): Store =>
  createStore(rootReducer, preloadedState, applyMiddleware(thunkMiddleware));

export const clientSideStore = (): Store =>
  createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default createStoreWithPreloadedState;
