import { Request, Response, NextFunction } from 'express';
import { ResponseUtil } from '../utils/apiResponse';
import { logger } from '../utils/logger';
import { z } from 'zod';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Handle validation errors from Zod
  if (err instanceof z.ZodError) {
    return res.status(400).json(ResponseUtil.error('Validation failed: ' + JSON.stringify(err.format())));
  }

  // Handle generic known errors 
  if (err.statusCode) {
    return res.status(err.statusCode).json(ResponseUtil.error(err.message));
  }

  // Catch-all internal server error (masking details in production)
  logger.error({ err }, 'Unhandled Internal Server Error');
  
  const isDev = process.env.NODE_ENV === 'development';
  return res.status(500).json(
    ResponseUtil.error(isDev ? err.message : 'Internal Server Error')
  );
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json(ResponseUtil.error(`Route ${req.method} ${req.url} not found`));
};
