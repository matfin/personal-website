import { Router, static as expressStatic } from 'express';
import path from 'path';
import { BaseController } from 'server/interfaces';

interface IRoutePair {
  itemPath: string;
  dir: string;
}

class AssetsController implements BaseController {
  private distAppFilePath: string = path.resolve(__dirname, '../../../dist');

  private assetsFilePath: string = path.resolve(__dirname, '../../../assets');

  public router = Router();

  constructor() {
    this.initMetadataRoutes();
    this.initAssetRoutes();
  }

  initMetadataRoutes = (): void => {
    const items: string[] = ['/manifest.json', '/robots.txt', '/sitemap.xml'];

    items.forEach(
      (item: string): Router =>
        this.router.use(
          item,
          expressStatic(`${this.assetsFilePath}/metadata/${item}`)
        )
    );
  };

  initAssetRoutes = (): void => {
    const routes: IRoutePair[] = [
      {
        itemPath: '/docs',
        dir: `${this.assetsFilePath}/docs`,
      },
      {
        itemPath: '/favicon.ico',
        dir: `${this.assetsFilePath}/images/icons/favicon.ico`,
      },
      {
        itemPath: '/images',
        dir: `${this.assetsFilePath}/images`,
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

    routes.forEach(
      ({ dir, itemPath }: IRoutePair): Router =>
        this.router.use(itemPath, expressStatic(dir))
    );
  };
}

export default AssetsController;
