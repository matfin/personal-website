import {
  Router,
  static as expressStatic,
} from 'express';
import path from 'path';
import { IBaseController } from 'server/interfaces';

interface IRoutePair {
  path: string,
  dir: string,
}

class AssetsController implements IBaseController {
  private distAppFilePath: string = path.resolve(__dirname, '../../../dist');

  private assetsFilePath: string = path.resolve(__dirname, '../../../assets');

  public router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes = () => {
    const routes: IRoutePair[] = [
      {
        path: '/docs',
        dir: `${this.assetsFilePath}/docs`
      },
      {
        path: '/images',
        dir: `${this.assetsFilePath}/images`
      },
      {
        path: '/manifest.json',
        dir: `${this.assetsFilePath}/metadata/manifest.json`
      },
      {
        path: '/robots.txt',
        dir: `${this.assetsFilePath}/metadata/robots.txt`
      },
      {
        path: '/scripts',
        dir: `${this.distAppFilePath}/app`
      },
      {
        path: '/worker.js',
        dir: `${this.distAppFilePath}/app/worker.bundle.js`
      }
    ];

    routes.forEach(({ dir, path }: IRoutePair) =>
      this.router.use(path, expressStatic(dir)));
  }
}

export default AssetsController;
