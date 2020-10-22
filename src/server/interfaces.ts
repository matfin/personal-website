import { Router } from 'express';

export interface BaseController {
  initRoutes?(): void;
  router: Router;
}
