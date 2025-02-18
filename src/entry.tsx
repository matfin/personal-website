import { StrictMode } from 'react';
import type ReactDOM from 'react-dom/client';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { getIsSSR } from '@config';
import { preloadedStore, store, type RootState } from '@services/state/store';
import App from '@app/App';

const container: HTMLElement | null = document.getElementById('root');
const isSSR: boolean = getIsSSR();

if (!container) {
  throw new Error('Root container not found.');
}

const hydratedStore: RootState = window.preloadedState;
const root: ReactDOM.Root = createRoot(container);

const Main = ({ store }: { store: RootState }): React.ReactNode => (
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

if (isSSR) {
  hydrateRoot(container, <Main store={preloadedStore(hydratedStore)} />);
} else {
  root.render(<Main store={store} />);
}
