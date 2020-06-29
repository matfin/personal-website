import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { createMockStore, renderWithRouter } from 'common/utils/testutils';
import App from './App';

describe('App', () => {
  const store: Store = createMockStore();

  it('should render', () => {
    const wrapper = renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(wrapper).toBeTruthy();
  });
});
