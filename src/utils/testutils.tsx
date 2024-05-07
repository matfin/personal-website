import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { CombinedAppState } from 'models';
import { day } from 'app/styles';
import { defaultState as pageDefaultState } from 'app/services/page/reducer';
import { defaultState as appDefaultState } from 'app/services/app/reducer';

export const defaultAppState: CombinedAppState = {
  pageState: pageDefaultState,
  appState: appDefaultState,
};

export const createMockStore = (
  state: CombinedAppState = defaultAppState,
): Store => {
  const mockStore = configureMockStore();

  return mockStore(state);
};

export const renderWithRouter = (children: React.ReactNode): RenderResult =>
  render(<Router>{children}</Router>);

export const renderWithStore = (children: React.ReactNode): RenderResult => {
  const store = createMockStore({} as CombinedAppState);

  return render(<Provider store={store}>{children}</Provider>);
};

export const renderWithTheme = (children: React.ReactNode): RenderResult =>
  render(<ThemeProvider theme={day}>{children}</ThemeProvider>);

export const setupMatchMedia = (matches: boolean) =>
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      media: query,
      matches,
      addEventListener: jest
        .fn()
        .mockImplementation((event, cb) => cb({ matches })),
      removeEventListener: jest.fn(),
    })),
  });

export default renderWithRouter;
