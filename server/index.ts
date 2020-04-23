import App from './App';
import AssetsController from './controllers/AssetsController';
import SSRController from './controllers/SSRController';
import StoriesController from './controllers/StoriesController';

const app = new App({
  port: 3000,
  controllers: [
    new StoriesController(),
    new AssetsController(),
    new SSRController(),
  ],
});

app.listen();
