import { Request, Response, Router } from 'express';
import path from 'path';
import { BaseController } from 'server/interfaces';

interface Headers {
  headers: {
    [index: string]: string;
  };
}

class ContentController implements BaseController {
  private baseFilePath: string = path.resolve(__dirname, '../../../');

  private defaultHeaders: Headers = {
    headers: {
      'Content-type': 'application/json',
      'X-Powered-By': 'FluffyRabbitsTail',
    },
  };

  public router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get('/content/page/:slug', this.getPage);
    this.router.get('/content/page/:slug(projects/*)', this.getPage);
  }

  getPage = (req: Request, res: Response): void => {
    const {
      params: { slug },
    } = req;

    return res
      .status(200)
      .sendFile(
        `${this.baseFilePath}/assets/pages/${slug}.json`,
        this.defaultHeaders
      );
  };
}

export default ContentController;
