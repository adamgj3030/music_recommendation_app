import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  // You could use custom error classes with statusCode properties.
  const statusCode = err.statusCode || 500;

  // Log details using Winston
  logger.error(`Error: ${err.message}`, {
    method: req.method,
    url: req.originalUrl,
    stack: err.stack,
    status: statusCode,
  });

  // Return a JSON error response
  return res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
  });
}
