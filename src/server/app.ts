import express, { Application } from 'express';
import config from 'common/config';
import { IBaseController } from 'server/interfaces';

interface IApp {
  baseUrl: string;
  port: string;
  controllers: IBaseController[];
}

class App {
  public app: Application;

  public port: string;

  public baseUrl: string;

  constructor({ controllers, baseUrl, port }: IApp) {
    this.app = express();
    this.baseUrl = baseUrl;
    this.port = port;
    this.setupRoutes(controllers);
  }

  private setupRoutes(controllers: any = []): void {
    controllers.forEach((controller: IBaseController) => {
      this.app.use('/', controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`App listening on ${this.baseUrl}:${this.port} with service worker caching ${config.enableCache ? 'enabled' : 'disabled'}`);
    });
  }
}

export default App;
