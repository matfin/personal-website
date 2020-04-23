import { Request, Response, Router } from 'express';
import path from 'path';
import { IBaseController } from 'server/common/interfaces';

class StoriesController implements IBaseController {
  private baseFilePath: string = path.resolve(__dirname, '../../');

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
    this.router.get('/content/stories', this.index);
    this.router.get('/content/story/:slug', this.getStory);
  }

  index = (req: Request, res: Response): void => {
    res
      .status(200)
      .sendFile(
        `${this.baseFilePath}/assets/content/list.json`,
        this.defaultHeaders,
      );
  }

  getStory = (req: Request, res: Response): void => {
    const { params: { slug } } = req;

    res
      .status(200)
      .sendFile(
        `${this.baseFilePath}/assets/content/${slug}.json`,
        this.defaultHeaders,
      );
  }
}

export default StoriesController;
