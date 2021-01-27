/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Store } from 'redux';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createClientStore } from '../store';
import App from './App';

const preloadedState = window._PRELOADED_STATE_;
const store: Store = createClientStore(preloadedState);

delete window._PRELOADED_STATE_;

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
