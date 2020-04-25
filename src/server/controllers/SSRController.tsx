import React from 'react';
import { Store } from 'redux';
import { renderToString } from 'react-dom/server';
import {
  NextFunction, Request, Response, Router,
} from 'express';
import fs from 'fs';
import path from 'path';
import { ServerStyleSheet } from 'styled-components';
import createStoreWithPreloadedState from 'common/store';
import { fetchPage } from 'app/views/page/actions';
import config from 'common/config';
import { IBaseController } from 'server/interfaces';
import IndexComponent from '../IndexComponent';

class SSRController implements IBaseController {
  private baseFilePath: string = path.resolve(__dirname, '../../../public');

  private store: Store;

  public router = Router();

  constructor() {
    this.store = createStoreWithPreloadedState();
    this.initRoutes();
  }

  initRoutes = () => {
    this.router.get('/:slug(projects|cv)?', this.reduxFetchPage, this.renderSSR);
  };

  reduxFetchPage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { slug } = req.params;

    await this.store.dispatch<any>(fetchPage(slug || 'home'));
    next();
  };

  renderSSR = async (req: Request, res: Response): Promise<any> => {
    const sheet = new ServerStyleSheet();
    const preloadedState: any = this.store.getState();
    const indexPath: string = `${this.baseFilePath}/index.html`;
    const preloadedStateJson: string = JSON.stringify(preloadedState).replace(/</g, '\\u003c');
    const { enableCache } = config;
    let reactAppHtml: string;
    let styleTags: string;

    try {
      reactAppHtml = renderToString(
        sheet.collectStyles(
          <IndexComponent
            context={{}}
            req={req}
            store={this.store}
          />,
        ),
      );
      styleTags = sheet.getStyleTags();
    } catch (error) {
      return res.status(500).json({ error });
    } finally {
      sheet.seal();
    }

    fs.readFile(indexPath, 'utf-8', (error: any, data: string): any => {
      if (error) {
        return res.status(500).json({ error });
      }

      const payload = data
        .replace(
          '<style type="text/css"></style>',
          `${styleTags}`,
        )
        .replace(
          // eslint-disable-next-line quotes
          `<div id="root"></div>`, `<div id="root">${reactAppHtml}</div>`,
        )
        .replace(
          '<script>PRELOADED_STATE</script>',
          `<script type="text/javascript">window._PRELOADED_STATE_ = ${preloadedStateJson};</script>`,
        )
        .replace(
          'ENABLE_CACHE',
          enableCache ? 'true' : 'false'
        );

      return res
        .status(200)
        .send(payload);
    });
  }
}

export default SSRController;
