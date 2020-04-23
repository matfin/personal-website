import React from 'react';
import { Store } from 'redux';
import { renderToString } from 'react-dom/server';
import {
  NextFunction, Request, Response, Router,
} from 'express';
import fs from 'fs';
import path from 'path';
import { ServerStyleSheet } from 'styled-components';
import createStoreWithPreloadedState from 'app/common/store';
import { fetchStories } from 'app/components/list/actions';
import { fetchStory } from 'app/components/story/actions';
import { IBaseController } from 'server/common/interfaces';
import IndexComponent from '../IndexComponent';

class SSRController implements IBaseController {
  private baseFilePath: string = path.resolve(__dirname, '../../public');

  private store: Store;

  public router = Router();

  constructor() {
    this.store = createStoreWithPreloadedState();
    this.initRoutes();
  }

  initRoutes = () => {
    this.router.get('/story/:slug', this.reduxFetchStory, this.renderSSR);
    this.router.get('/', this.reduxFetchStories, this.renderSSR);
  }

  reduxFetchStories = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    await this.store.dispatch(fetchStories());
    next();
  };

  reduxFetchStory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { slug } = req.params;

    await this.store.dispatch(fetchStory(slug));
    next();
  }

  renderSSR = async (req: Request, res: Response): Promise<any> => {
    const sheet = new ServerStyleSheet();
    const preloadedState: any = this.store.getState();
    const indexPath: string = `${this.baseFilePath}/index.html`;
    const preloadedStateJson: string = JSON.stringify(preloadedState).replace(/</g, '\\u003c');
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
      res.status(500).json({ error });
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
        );

      return res
        .status(200)
        .send(payload);
    });
  }
}

export default SSRController;
