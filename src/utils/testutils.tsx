import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { store } from 'app/services/state/store';
import { day } from 'app/styles';

export const renderWithRouter = (children: React.ReactNode): RenderResult =>
  render(<Router>{children}</Router>);

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
