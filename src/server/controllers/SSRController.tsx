import React from 'react';
import { Store } from 'redux';
import { Helmet, HelmetData } from 'react-helmet';
import { renderToNodeStream } from 'react-dom/server';
import { NextFunction, Request, Response, Router } from 'express';
import { ServerStyleSheet } from 'styled-components';
import createStoreWithPreloadedState from 'common/store';
import { fetchPage } from 'app/views/page/actions';
import config from 'common/config';
import { IBaseController } from 'server/interfaces';
import { indexTemplate, isIE, unsupported } from 'common/utils';
import { CacheDictionary } from 'common/interfaces';
import IndexComponent from '../IndexComponent';

class SSRController implements IBaseController {
  private store: Store;

  private caches: CacheDictionary;

  public router = Router();

  constructor() {
    this.caches = {} as CacheDictionary;
    this.store = createStoreWithPreloadedState();
    this.initRoutes();
  }

  initRoutes = () => {
    this.router.get(
      '/:slug(404|about|projects|cv|now)?',
      this.browserVersionGuard,
      this.reduxFetchPage,
      this.sendSSR
    );
    this.router.get(
      '/:slug(projects/*)',
      this.browserVersionGuard,
      this.reduxFetchPage,
      this.sendSSR
    );
    this.router.use(this.redirectToNotFound);
  };

  redirectToNotFound = (req: Request, res: Response): void =>
    res.redirect('/404');

  browserVersionGuard = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { headers } = req;
    const ua: string | undefined = headers['user-agent'];

    if (isIE(ua)) {
      return res.status(200).send(unsupported());
    }

    return next();
  };

  reduxFetchPage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { slug } = req.params;

    await this.store.dispatch<any>(fetchPage(slug || 'home'));
    next();
  };

  sendSSR = async (req: Request, res: Response): Promise<any> => {
    const { slug } = req.params;
    const { npm_package_version } = process.env;
    const cacheKey = `${slug}-${npm_package_version}`;

    if (!this.caches[cacheKey]) {
      try {
        this.caches[cacheKey] = await this.generateSSRContent(req);
      } catch (e) {
        return res.status(500).send({ e: e.toString() });
      }
    }

    return res.status(200).send(this.caches[cacheKey]);
  };

  generateSSRContent = (req: Request): Promise<string> =>
    new Promise((resolve, reject): void => {
      const sheet = new ServerStyleSheet();
      const { npm_package_version } = process.env;
      const preloadedState: any = this.store.getState();
      const preloadedStateJson: string = JSON.stringify(preloadedState).replace(
        /</g,
        '\\u003c'
      );
      const { apiUrl, canonicalUrl, enableCache } = config;
      const bodyStream: NodeJS.ReadableStream = renderToNodeStream(
        sheet.collectStyles(
          <IndexComponent context={{}} req={req} store={this.store} />
        )
      );
      const body: string[] = [];

      bodyStream.on('data', (chunk: any) => {
        body.push(chunk.toString());
      });

      bodyStream.on('error', (error: any) => {
        reject(new Error(error.toString()));
      });

      bodyStream.on('end', () => {
        const styleTags: string = sheet.getStyleTags();
        const helmet: HelmetData = Helmet.renderStatic();
        const payload: string = indexTemplate({
          apiUrl,
          canonicalUrl,
          enableServiceWorker: enableCache,
          helmet,
          packageVersion: npm_package_version,
          preloadedState: preloadedStateJson,
          reactAppHtml: body.join(''),
          styleTags,
        });

        sheet.seal();

        resolve(payload);
      });
    });
}

export default SSRController;
