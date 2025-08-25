import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
/**
 * Middleware to validate request body using a Zod schema.
 * Now throws ValidationError for consistent error handling
 * Usage: app.post("/", validate(mySchema), handler)
 */
export declare const validate: (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => void;
