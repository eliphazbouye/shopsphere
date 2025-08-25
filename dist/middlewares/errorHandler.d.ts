import { Request, Response, NextFunction } from "express";
/**
 * Enhanced error handler middleware that handles different error types
 * and provides consistent error responses with proper logging
 */
export declare function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void;
