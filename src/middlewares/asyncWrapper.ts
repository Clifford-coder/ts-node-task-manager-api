import { NextFunction, Request, Response } from 'express';

export const asyncWrapper =
  (fn: any) => async (res: Request, req: Response, next: NextFunction) => {
    try {
      await fn(res, req, next);
    } catch (error) {
      next(error);
    }
  };
