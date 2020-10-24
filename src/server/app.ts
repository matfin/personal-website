import express, { Application } from 'express';
import { getEnableCache } from 'common/config';
import { BaseController } from 'server/interfaces';

interface IApp {
  port: string;
  controllers: BaseController[];
}

class App {
  public app: Application;

  public port: string;

  constructor({ controllers, port }: IApp) {
    this.app = express();
    this.port = port;
    this.setupRoutes(controllers);
  }

  private setupRoutes(controllers: BaseController[] = []): void {
    controllers.forEach((controller: BaseController) => {
      this.app.use('/', controller.router);
    });
  }

  public listen(): void {
    const enableCache: boolean = getEnableCache();

    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.info(
        `App listening on ${this.port} with service worker caching ${
          enableCache ? 'enabled' : 'disabled'
        }`
      );
    });
  }
}

export default App;
