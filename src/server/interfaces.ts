import { Router } from 'express';

export interface IBaseController {
  initRoutes(): void;
  router: Router;
}
