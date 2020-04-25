import AssetsController from 'server/controllers/AssetsController';
import SSRController from 'server/controllers/SSRController';
import ContentController from 'server/controllers/ContentController';
import App from './app';

const app = new App({
  port: 3000,
  controllers: [
    new ContentController(),
    new AssetsController(),
    new SSRController(),
  ],
});

app.listen();
