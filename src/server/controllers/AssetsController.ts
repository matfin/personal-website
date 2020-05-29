import {
  Router,
  static as expressStatic,
} from 'express';
import path from 'path';
import { IBaseController } from 'server/interfaces';

class AssetsController implements IBaseController {
  private distAppFilePath: string = path.resolve(__dirname, '../../../dist');

  private assetsFilePath: string = path.resolve(__dirname, '../../../assets');

  public router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes = () => {
    this.router.use('/scripts', expressStatic(`${this.distAppFilePath}/app`));
    this.router.use('/images', expressStatic(`${this.assetsFilePath}/images`));
    this.router.use('/manifest.json', expressStatic(`${this.assetsFilePath}/metadata/manifest.json`));
    this.router.use('/worker.js', expressStatic(`${this.distAppFilePath}/app/worker.bundle.js`));
  }
}

export default AssetsController;
