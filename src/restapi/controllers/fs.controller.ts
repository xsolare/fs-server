import type { Request, Response } from 'express';

import { Router } from 'express';
import { resolve } from 'path';

import { getFiles } from '#/utils/get-files';

class FsController {
  public path = '/fs';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/files`, this.getByFiles);
    this.router.get(`${this.path}/send-file`, this.getSendFile);
    this.router.get(`${this.path}/download-file`, this.getDownloadFile);
    // this.router.get(`${this.path}/post`, this.postDirectory);
  }

  private async getByFiles(req: Request, res: Response) {
    const path = resolve((req.query.path as string) ?? './mock');
    const files = getFiles(path);

    res.json(files);
  }

  private async getSendFile(req: Request, res: Response) {
    const path = resolve((req.query.path as string) ?? './mock');

    res.sendFile(path);
  }

  private async getDownloadFile(req: Request, res: Response) {
    const path = resolve((req.query.path as string) ?? './mock');

    res.download(path, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  // private async postDirectory(req: Request, res: Response) {
  //   const path = req.params.path ?? './mock';

  //   fs.mkdir(path, (err) => {
  //     if (err) {
  //       res.json({ msg: `Failed to create directory: ${err}` });
  //     } else {
  //       res.json({ msg: 'Directory created successfully' });
  //     }
  //   });
  // }
}

export default FsController;
