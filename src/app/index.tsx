import React, { StrictMode } from 'react';
import { Store } from '@reduxjs/toolkit';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import { clientStore } from 'app/services/state/store';
import type { RootState } from 'app/services/state/store';
import App from './App';

const preloadedState: RootState = window._PRELOADED_STATE_;
const store: Store = clientStore(preloadedState);
const container: HTMLElement = document.getElementById('root')!;

delete window._PRELOADED_STATE_;

hydrateRoot(
  container,
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
