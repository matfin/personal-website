import AssetsController from 'server/controllers/AssetsController';
import SSRController from 'server/controllers/SSRController';
import ContentController from 'server/controllers/ContentController';
import config from 'common/config';
import App from './app';

const { baseUrl, port } = config;

const app = new App({
  baseUrl,
  port,
  controllers: [
    new ContentController(),
    new AssetsController(),
    new SSRController(),
  ],
});

app.listen();
