import {
  Router,
  static as expressStatic,
} from 'express';
import path from 'path';
import { IBaseController } from 'server/interfaces';

interface IRoutePair {
  itemPath: string,
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
        itemPath: '/docs',
        dir: `${this.assetsFilePath}/docs`,
      },
      {
        itemPath: '/images',
        dir: `${this.assetsFilePath}/images`,
      },
      {
        itemPath: '/manifest.json',
        dir: `${this.assetsFilePath}/metadata/manifest.json`,
      },
      {
        itemPath: '/robots.txt',
        dir: `${this.assetsFilePath}/metadata/robots.txt`,
      },
      {
        itemPath: '/sitemap.xml',
        dir: `${this.assetsFilePath}/metadata/sitemap.xml`,
      },
      {
        itemPath: '/scripts',
        dir: `${this.distAppFilePath}/app`,
      },
      {
        itemPath: '/worker.js',
        dir: `${this.distAppFilePath}/app/worker.bundle.js`,
      },
    ];

    routes.forEach(({ dir, itemPath }: IRoutePair) => (
      this.router.use(itemPath, expressStatic(dir))
    ));
  };
}

export default AssetsController;
