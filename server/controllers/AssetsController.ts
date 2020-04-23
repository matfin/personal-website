import {
  Request,
  Response,
  Router,
  static as expressStatic,
} from 'express';
import path from 'path';
import { IBaseController } from 'server/common/interfaces';

class AssetsController implements IBaseController {
  private distAppFilePath: string = path.resolve(__dirname, '../../dist/app');

  private assetsFilePath: string = path.resolve(__dirname, '../../assets');

  public router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes = () => {
    this.router.get('/:file.js', this.scripts);
    this.router.use('/images', expressStatic(`${this.assetsFilePath}/images`));
    this.router.use('/meta', expressStatic(`${this.assetsFilePath}/metadata`));
  }

  scripts = (req: Request, res: Response): void => {
    const { params: { file } } = req;
    const filePath: string = `${this.distAppFilePath}/${file}.js`;

    res
      .status(200)
      .sendFile(
        filePath,
        {
          headers: {
            'Content-Type': 'application/x-javascript',
          },
        },
      );
  }
}

export default AssetsController;
