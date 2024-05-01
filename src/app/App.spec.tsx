import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import {
  createMockStore,
  renderWithRouter,
  setupMatchMedia,
} from 'utils/testutils';
import App from './App';

describe('App', (): void => {
  const store: Store = createMockStore();

  beforeAll((): void => {
    setupMatchMedia(false);
  });

  it('should render', (): void => {
    const wrapper = renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(wrapper).toBeTruthy();
  });
});
