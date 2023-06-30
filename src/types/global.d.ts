import { PrismaClient } from '@prisma/client';

declare let global: { prisma: PrismaClient };
declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

import * as express from 'express';
declare const app: express.Express;
export { app };
