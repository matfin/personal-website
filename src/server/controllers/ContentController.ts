import { Request, Response, Router } from 'express';
import path from 'path';
import { IBaseController } from 'server/interfaces';

class ContentController implements IBaseController {
  private baseFilePath: string = path.resolve(__dirname, '../../../');

  private defaultHeaders: any = {
    headers: {
      'Content-type': 'application/json',
      'X-Powered-By': 'FluffyRabbitsTail',
    },
  };

  public router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get('/content/page/:slug', this.getPage);
  }

  getPage = (req: Request, res: Response): void => {
    const { params: { slug } } = req;

    return res
      .status(200)
      .sendFile(
        `${this.baseFilePath}/assets/pages/${slug}.json`,
        this.defaultHeaders,
      );
  }
}

export default ContentController;
