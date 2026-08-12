import App from '@app/App';
import { preloadedStore, type RootState, store } from '@services/state/store';
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const container: HTMLElement | null = document.getElementById('root');

if (!container) {
  throw new Error('Root container not found.');
}

const Main = ({ store }: { store: RootState }): React.ReactNode => (
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

if (container.hasChildNodes()) {
  hydrateRoot(
    container,
    <Main store={preloadedStore(window.preloadedState)} />,
  );
} else {
  createRoot(container).render(<Main store={store} />);
}
