import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { CombinedAppState } from 'common/models';
import { defaultState as pageDefaultState } from 'app/views/page/reducer';
import { defaultState as appDefaultState } from 'app/reducer';

export const defaultAppState: CombinedAppState = {
  pageState: pageDefaultState,
  appState: appDefaultState,
};

export const createMockStore = (
  state: CombinedAppState = defaultAppState
): Store => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  return mockStore(state);
};

export const renderWithRouter = (
  children: JSX.Element | JSX.Element[]
): RenderResult => render(<Router>{children}</Router>);

export const renderWithStore = (
  children: JSX.Element | JSX.Element[]
): RenderResult => {
  const store = createMockStore({} as CombinedAppState);

  return render(<Provider store={store}>{children}</Provider>);
};

export default renderWithRouter;
