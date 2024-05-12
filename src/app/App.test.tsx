import React from 'react';
import { Provider } from 'react-redux';

import { store } from 'app/services/state/store';
import { renderWithRouter, setupMatchMedia } from 'utils/testutils';
import App from './App';

jest.mock('app/views/page');

describe('App', (): void => {
  beforeAll((): void => {
    setupMatchMedia(false);
  });

  it('should render wihout crashing', (): void => {
    expect(() =>
      renderWithRouter(
        <Provider store={store}>
          <App />
        </Provider>,
      ),
    ).not.toThrow();
  });
});
