import AssetsController from 'server/controllers/AssetsController';
import SSRController from 'server/controllers/SSRController';
import ContentController from 'server/controllers/ContentController';
import config from 'common/config';
import App from './app';

const { port } = config;

const app = new App({
  controllers: [
    new ContentController(),
    new AssetsController(),
    new SSRController(),
  ],
  port,
});

app.listen();
