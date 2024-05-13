import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';

import { store } from '@services/state/store';
import { day } from '@styles';

export const renderWithRouter = (children: React.ReactNode): RenderResult =>
  render(
    <HelmetProvider>
      <Router>{children}</Router>
    </HelmetProvider>,
  );

export const renderWithStore = (children: React.ReactNode): RenderResult => {
  return render(<Provider store={store}>{children}</Provider>);
};

export const renderWithTheme = (children: React.ReactNode): RenderResult =>
  render(<ThemeProvider theme={day}>{children}</ThemeProvider>);

export const renderWrapped = (children: React.ReactNode): RenderResult =>
  render(
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>,
  );

export const renderWithHelmetProvider = ({
  children,
  helmetContext,
}: {
  children: React.ReactNode;
  helmetContext: { helmet?: HelmetServerState };
}): RenderResult => {
  HelmetProvider.canUseDOM = false;

  return render(
    <HelmetProvider context={helmetContext}>{children}</HelmetProvider>,
  );
};

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
