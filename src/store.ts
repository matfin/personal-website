import {
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  Store,
} from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { AppReduxAction, CombinedAppState, PageReduxAction } from 'models';
import { appState } from 'app/reducer';
import rootSaga from 'app/sagas';
import { pageState } from 'app/services/page/reducer';

type ReduxAction = AppReduxAction | PageReduxAction;

const rootReducer: Reducer<CombinedAppState, ReduxAction> = combineReducers({
  appState,
  pageState,
});

export const createServerStore = (preloadedState?: CombinedAppState): Store =>
  createStore(rootReducer, preloadedState);

export const createClientStore = (preloadedState?: CombinedAppState): Store => {
  const sagaMiddleware: SagaMiddleware = createSagaMiddleware();
  const store: Store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
