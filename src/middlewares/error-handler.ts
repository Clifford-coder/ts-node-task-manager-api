import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import { CustomAPIError } from '../errors/customErrorFactory';

const errorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomAPIError)
    res.status(err.statusCode).json({ message: err.message });
  res.status(500).send('Something went wrong');
  next();
};

export default errorHandler;
