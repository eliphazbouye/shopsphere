import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

/**
 * Middleware to validate request body using a Zod schema.
 * Usage: app.post("/", validate(mySchema), handler)
 */
export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    // Zod throws a ZodError; send 400 with details
    return res.status(400).json({ error: (err as any).errors || (err as any).message });
  }
};