import { StrictMode } from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import { ServerStyleSheet } from 'styled-components';

import type { Page } from '@models/interfaces';
import { store } from '@services/state/store';
import { setPage } from '@services/state/page/slice';
import { loadPage } from '@ssg/content_loader';
import App from '@app/App';

export const render = async (slug: string) => {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const sheet = new ServerStyleSheet();
  const url: string = `/${slug}`;
  const page: Page | null = await loadPage(
    slug,
    './public/pages',
  );

  if (page) {
    store.dispatch(setPage(page));
  }

  const preloadedStateJSON: string = JSON.stringify(store.getState()).replace(
    /</g,
    '\\u003c',
  );

  const html = renderToString(
    sheet.collectStyles(
      <StrictMode>
        <Provider store={store}>
          <StaticRouter location={url}>
            <HelmetProvider context={helmetContext}>
              <App />
            </HelmetProvider>
          </StaticRouter>
        </Provider>
      </StrictMode>,
    ),
  );

  const styleTags: string = sheet.getStyleTags();

  sheet.seal();

  return { helmetContext, html, preloadedStateJSON, styleTags };
};
