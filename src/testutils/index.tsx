import type React from 'react';
import { vi } from 'vitest';
import { render, type RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { store } from '@services/state/store';
import { day } from '@styles/themes';

export const renderWithRouter = (children: React.ReactNode): RenderResult =>
  render(
    <Router>{children}</Router>
  );

export const renderWithStore = (children: React.ReactNode): RenderResult => {
  return render(<Provider store={store}>{children}</Provider>);
};

export const renderWithTheme = (children: React.ReactNode): RenderResult =>
  render(<ThemeProvider theme={day}>{children}</ThemeProvider>);

export const renderWrapped = (children: React.ReactNode): RenderResult =>
  render(
    <ThemeProvider theme={day}>
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
      ,
    </ThemeProvider>,
  );

export const setupMatchMedia = (matches: boolean) =>
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      media: query,
      matches,
      addEventListener: vi.fn().mockImplementation((_, cb) => cb({ matches })),
      removeEventListener: vi.fn(),
    })),
  });

export default renderWithRouter;
