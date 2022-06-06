import React from 'react';
import { Store } from 'redux';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { CombinedAppState } from 'models';
import { createClientStore } from '../store';
import App from './App';

const preloadedState: CombinedAppState = window._PRELOADED_STATE_;
const store: Store = createClientStore(preloadedState);
const container: Document | Element = document.getElementById('root')!;

delete window._PRELOADED_STATE_;

hydrateRoot(
  container,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
