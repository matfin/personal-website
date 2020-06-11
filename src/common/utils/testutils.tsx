/* istanbul ignore file */
import React from 'react';
import { render } from '@testing-library/react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { IAppState, IPageState } from 'common/interfaces';
import { defaultState as pageDefaultState } from 'app/views/page/reducer';
import { defaultState as appDefaultState } from 'app/reducer';

interface ICombinedState {
  pageState?: IPageState,
  appState?: IAppState,
}

export const defaultAppState: ICombinedState = {
  pageState: pageDefaultState,
  appState: appDefaultState,
};

export const createMockStore = (state: ICombinedState = defaultAppState): Store => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  return mockStore(state);
};

export const renderWithRouter = (children: any): any => render(<Router>{children}</Router>);

export const renderWithStore = (children: any): any => {
  const store = createMockStore({});

  return render(<Provider store={store}>{children}</Provider>);
};

export default renderWithRouter;
