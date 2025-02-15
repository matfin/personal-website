import { StrictMode } from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { prerenderToNodeStream } from 'react-dom/static';

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
  const version = process.env.npm_package_version;
  const bootstrapScripts: string[] = [
    `/main-${version}.js`,
    ...(withServiceWorker ? [`/swregister-${version}.js`] : []),
  ];
  const cspNonce: string = crypto.randomUUID();
  const cspTag: string = `
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; img-src 'self'; style-src 'self'; script-src 'self' 'nonce-${cspNonce}'; child-src 'self';"
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
      <StaticWrapper stylesheet={`/main-${version}.css`}>
        <Provider store={store}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </Provider>
      </StaticWrapper>
    </StrictMode>,
    {
      bootstrapScripts,
    },
  );

  const html: string = await htmlFromPrelude(prelude);

  return html
    .replace('--csp--', cspTag)
    .replace(
      '--preloadedstate--',
      `<script nonce="${cspNonce}">window.preloadedState=${preloadedStateJSON}</script>`,
    );
};
