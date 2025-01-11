import { StrictMode } from 'react';
import type ReactDOM from 'react-dom/client';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import { preloadedStore, store } from '@services/state/store';
import type { RootState } from '@services/state/store';
import App from '@app/App';

const container: HTMLElement | null = document.getElementById('root');

if (!container) {
  throw new Error('Root container not found.');
}

const shouldHydrate: boolean = process.env.NODE_ENV !== 'development';
const hydratedStore: RootState = window.preloadedState;
const root: ReactDOM.Root = createRoot(container);

if (shouldHydrate) {
  hydrateRoot(
    container,
    <StrictMode>
      <Provider store={preloadedStore(hydratedStore)}>
        <BrowserRouter>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    </StrictMode>,
  );
} else {
  root.render(
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
}
