import AssetsController from 'server/controllers/AssetsController';
import SSRController from 'server/controllers/SSRController';
import ContentController from 'server/controllers/ContentController';
import { getPort } from 'common/config';
import App from './app';

const port: string = getPort();

const app = new App({
  controllers: [
    new ContentController(),
    new AssetsController(),
    new SSRController(),
  ],
  port,
});

app.listen();
