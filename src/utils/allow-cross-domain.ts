import type { Request, Response, NextFunction } from 'express';

// CORS middleware
export const allowCrossDomain = (req: Request, res: Response, next: NextFunction) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Credentials`, `true`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type, Accept`);
  next();
};
