import { Request, Response, NextFunction } from 'express';
/**
 * Middleware to log API requests and responses
 * Tracks all actions on the API including timing and context
 */
export declare const apiLogger: (req: Request, res: Response, next: NextFunction) => void;
