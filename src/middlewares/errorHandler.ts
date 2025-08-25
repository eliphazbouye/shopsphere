import { Request, Response, NextFunction } from "express";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  // Minimal error handler that sends JSON.
  // Expand for different error types (ZodError, Prisma.PrismaClientKnownRequestError, etc.)
  const status = (err && typeof err === "object" && "status" in err) ? (err as any).status : 500;
  const message = (err && typeof err === "object" && "message" in err) ? (err as any).message : "Internal Server Error";

  res.status(status as number).json({
    error: {
      message,
      // In non-production, include stack
      ...(process.env.NODE_ENV === "development" ? { stack: (err as any)?.stack } : {})
    }
  });
}