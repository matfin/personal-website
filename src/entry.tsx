import App from '@app/App';
import { getIsSSR } from '@config';
import { preloadedStore, type RootState, store } from '@services/state/store';
import { StrictMode } from 'react';
import type ReactDOM from 'react-dom/client';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

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
