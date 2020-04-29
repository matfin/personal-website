/* istanbul ignore file */
import React from 'react';
import { render } from '@testing-library/react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { IPageState } from 'common/interfaces';
import { defaultState as pageDefaultState } from 'app/views/page/reducer'

interface IAppState {
  pageState?: IPageState,
};

export const defaultAppState: IAppState = {
  pageState: pageDefaultState
};

export const createMockStore = (state: IAppState = defaultAppState): Store => {
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
