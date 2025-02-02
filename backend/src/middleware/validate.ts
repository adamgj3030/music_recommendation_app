import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export function validateQuery(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.query);
    if (error) {
      res.status(400).json({ error: error.message });
    } else {
    next();
    }
  };
}