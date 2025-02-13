import { StrictMode } from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { prerenderToNodeStream } from 'react-dom/static';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import type { Page } from '@models/interfaces';
import { store } from '@services/state/store';
import { setPage } from '@services/state/page/slice';
import { loadPage } from '@ssg/content_loader';
import { StaticWrapper } from './static-wrapper';
import App from '@app/App';

const htmlFromPrelude = (prelude: NodeJS.ReadableStream): Promise<string> =>
  new Promise((resolve, reject) => {
    let data = '';

    prelude.on('data', (chunk) => {
      data += chunk;
    });

    prelude.on('end', (): void => resolve(data));
    prelude.on('error', reject);
  });

export const render = async (
  slug: string,
  withServiceWorker = false,
): Promise<string> => {
  const sheet = new ServerStyleSheet();
  const bootstrapScripts: string[] = [
    '/main.js',
    ...(withServiceWorker ? ['/swregister.js'] : []),
  ];
  const cspNonce: string = crypto.randomUUID();
  const cspTag: string = `
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; img-src 'self'; style-src 'unsafe-inline'; script-src 'self' 'nonce-${cspNonce}'; child-src 'self';"
    />
  `;
  const url: string = `/${slug}`;
  const page: Page | null = await loadPage(slug, './public/pages');

  if (page) {
    store.dispatch(setPage(page));
  }

  const preloadedStateJSON: string = JSON.stringify(store.getState()).replace(
    /</g,
    '\\u003c',
  );

  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticWrapper>
        <StyleSheetManager sheet={sheet.instance}>
          <Provider store={store}>
            <StaticRouter location={url}>
              <App />
            </StaticRouter>
          </Provider>
        </StyleSheetManager>
      </StaticWrapper>
    </StrictMode>,
    {
      bootstrapScripts,
    },
  );

  const html: string = await htmlFromPrelude(prelude);
  const styleTags: string = sheet.getStyleTags();

  sheet.seal();

  return html
    .replace('--csp--', cspTag)
    .replace('--styletags--', styleTags)
    .replace(
      '--preloadedstate--',
      `<script nonce="${cspNonce}">window.preloadedState=${preloadedStateJSON}</script>`,
    );
};
