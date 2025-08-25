import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { ValidationError } from "../types/errors";

/**
 * Middleware to validate request body using a Zod schema.
 * Now throws ValidationError for consistent error handling
 * Usage: app.post("/", validate(mySchema), handler)
 */
export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    // Pass Zod error to error handler for consistent processing
    next(err);
  }
};