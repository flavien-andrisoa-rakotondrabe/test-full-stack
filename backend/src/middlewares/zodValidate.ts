import { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

export const zodValidate =
  (schema: z.ZodSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: error.issues.map((issue: z.ZodIssue) => ({
            path: issue.path.join('.'),
            message: issue.message,
          })),
        });
      }

      console.error('[System Error]', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  };
