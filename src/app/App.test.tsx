import { beforeAll, describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';

import { store } from '@services/state/store';
import { renderWithRouter, setupMatchMedia } from '@testutils';
import App from './App';

vi.mock('@views/page', () => ({
  default: () => 'page',
}));

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
