/* eslint-disable import/no-duplicates */
import type { RequestHandler } from 'express';

import { Router } from 'express';

import UserController from '#/restapi/controllers/user.controller';
import FsController from '#/restapi/controllers/fs.controller';

const { path: userPath, router: userRouter } = new UserController();
const { path: fsPath, router: fsRouter } = new FsController();

const api: RequestHandler = Router().use(userPath, userRouter).use(fsPath, fsRouter);

export default Router().use('/api', api);
