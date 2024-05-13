import React from 'react';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Store } from '@reduxjs/toolkit';
import { HelmetServerState } from 'react-helmet-async';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

import { store } from 'app/services/state/store';
import type { RootState } from 'app/services/state/store';
import { setPage } from 'app/services/state/page';
import { getAppVersion, getCanonicalUrl, getEnableCache } from '../config';
import { indexTemplate } from 'utils';
import { Page, StaticReqProps } from 'models';
import IndexComponent from './IndexComponent';

class SSGController {
  private store: Store;

  constructor() {
    this.store = store;
  }

  public generate = async (slug: string): Promise<string | null> => {
    try {
      await this.loadPage(slug ?? '/index');

      const content: string = await this.generateStaticContentString({
        url: slug,
      });

      return this.withCSPNonce(content);
    } catch (e) {
      console.error({ generate: e });
      return null;
    }
  };

  private loadPage = async (slug: string): Promise<void> => {
    const path = `./pages`;

    try {
      const contents: string = (
        await fs.readFile(`${path}/${slug}.json`)
      ).toString();
      const page: Page = JSON.parse(contents);

      this.store.dispatch(setPage(page));
    } catch (e) {
      console.error(e);
    }
  };

  private withCSPNonce = (ssrContent: string): string => {
    const regex = /CSP_NONCE_KEY/gi;
    const cspNonce: string = uuidv4();

    return ssrContent.replace(regex, cspNonce);
  };

  private generateStaticContentString = (
    req: StaticReqProps,
  ): Promise<string> =>
    new Promise((resolve): void => {
      const appVersion: string = getAppVersion();
      const canonicalUrl: string = getCanonicalUrl();
      const enableCache: boolean = getEnableCache();
      const sheet = new ServerStyleSheet();
      const preloadedState: RootState = this.store.getState();
      const preloadedStateJson: string = JSON.stringify(preloadedState).replace(
        /</g,
        '\\u003c',
      );
      const helmetContext: { helmet?: HelmetServerState } = {};
      const body: string = renderToString(
        sheet.collectStyles(
          <IndexComponent
            helmetContext={helmetContext}
            req={req}
            store={this.store}
          />,
        ),
      );

      const styleTags: string = sheet.getStyleTags();
      const { helmet }: { helmet?: HelmetServerState } = helmetContext;
      const payload: string = indexTemplate({
        canonicalUrl,
        enableServiceWorker: enableCache,
        helmet,
        packageVersion: appVersion,
        preloadedState: preloadedStateJson,
        reactAppHtml: body,
        styleTags,
      });

      sheet.seal();

      resolve(payload);
    });
}

export default SSGController;
