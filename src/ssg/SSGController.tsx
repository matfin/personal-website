import React from 'react';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Store } from 'redux';
import { Helmet, HelmetData } from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import createStoreWithPreloadedState from '../store';
import { fetchPageSuccess } from 'app/views/page/actions';
import { getAppVersion, getCanonicalUrl, getEnableCache } from '../config';
import { indexTemplate } from 'utils';
import { CombinedAppState, PageProps, StaticReqProps } from 'models';
import IndexComponent from './IndexComponent';

class SSGController {
  private store: Store;

  constructor() {
    this.store = createStoreWithPreloadedState();
  }

  public generate = async (slug: string): Promise<string> => {
    await this.loadPage(slug || 'index');

    const content: string = await this.generateStaticContentString({
      url: slug,
    });

    return this.withCSPNonce(content);
  };

  private loadPage = async (slug: string): Promise<void> => {
    const path = `./pages`;
    const contents: string = (
      await fs.readFile(`${path}/${slug}.json`)
    ).toString();
    const page: PageProps = JSON.parse(contents);

    this.store.dispatch(fetchPageSuccess(page));
  };

  private withCSPNonce = (ssrContent: string): string => {
    const regex = /CSP_NONCE_KEY/gi;
    const cspNonce: string = uuidv4();

    return ssrContent.replace(regex, cspNonce);
  };

  private generateStaticContentString = (
    req: StaticReqProps
  ): Promise<string> =>
    new Promise((resolve): void => {
      const appVersion: string = getAppVersion();
      const canonicalUrl: string = getCanonicalUrl();
      const enableCache: boolean = getEnableCache();
      const sheet = new ServerStyleSheet();
      const preloadedState: CombinedAppState = this.store.getState();
      const preloadedStateJson: string = JSON.stringify(preloadedState).replace(
        /</g,
        '\\u003c'
      );
      const body: string = renderToString(
        sheet.collectStyles(
          <IndexComponent context={{}} req={req} store={this.store} />
        )
      );

      const styleTags: string = sheet.getStyleTags();
      const helmet: HelmetData = Helmet.renderStatic();
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
