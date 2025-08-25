import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { logger } from "../utils/logger";
import { STATUS_CODES } from "../constants/statusCodes";
import { AppError, ValidationError, DatabaseError } from "../types/errors";

interface ErrorResponse {
  error: {
    message: string;
    code: string;
    statusCode: number;
    details?: unknown;
    stack?: string;
    timestamp: string;
    requestId?: string;
  };
}

/**
 * Enhanced error handler middleware that handles different error types
 * and provides consistent error responses with proper logging
 */
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void {
  const requestId = (req as any).requestId;
  const timestamp = new Date().toISOString();

  // Log the error
  logger.apiError(req.method, req.path, err as Error, {
    requestId,
    metadata: {
      userAgent: req.get('user-agent'),
      ip: req.ip || req.connection.remoteAddress
    }
  });

  let errorResponse: ErrorResponse;

  // Handle different error types
  if (err instanceof AppError) {
    // Custom application errors
    errorResponse = {
      error: {
        message: err.message,
        code: err.errorCode || 'APP_ERROR',
        statusCode: err.statusCode,
        details: err.details,
        timestamp,
        requestId,
        ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {})
      }
    };
  } else if (err instanceof ZodError) {
    // Zod validation errors
    const validationError = new ValidationError("Validation failed", {
      issues: err.issues.map((issue: any) => ({
        path: issue.path.join('.'),
        message: issue.message,
        code: issue.code
      }))
    });
    
    errorResponse = {
      error: {
        message: validationError.message,
        code: validationError.errorCode!,
        statusCode: validationError.statusCode,
        details: validationError.details,
        timestamp,
        requestId,
        ...(process.env.NODE_ENV === "development" ? { stack: validationError.stack } : {})
      }
    };
  } else if (err && typeof err === 'object' && 'code' in err && typeof (err as any).code === 'string') {
    // Handle database-like errors (including Prisma errors)
    const dbErr = err as any;
    let dbError: DatabaseError;
    
    switch (dbErr.code) {
      case 'P2002':
        dbError = new DatabaseError(STATUS_CODES.DUPLICATE_ENTRY.message, {
          constraint: dbErr.meta?.target,
          originalCode: dbErr.code
        });
        // Create new error with correct status code
        const duplicateError = new DatabaseError(STATUS_CODES.DUPLICATE_ENTRY.message, dbError.details);
        Object.defineProperty(duplicateError, 'statusCode', {
          value: STATUS_CODES.DUPLICATE_ENTRY.code,
          writable: false
        });
        dbError = duplicateError;
        break;
      case 'P2025':
        dbError = new DatabaseError(STATUS_CODES.NOT_FOUND.message, {
          originalCode: dbErr.code
        });
        const notFoundError = new DatabaseError(STATUS_CODES.NOT_FOUND.message, dbError.details);
        Object.defineProperty(notFoundError, 'statusCode', {
          value: STATUS_CODES.NOT_FOUND.code,
          writable: false
        });
        dbError = notFoundError;
        break;
      default:
        dbError = new DatabaseError(STATUS_CODES.DATABASE_QUERY_ERROR.message, {
          originalCode: dbErr.code,
          meta: dbErr.meta
        });
    }
    
    errorResponse = {
      error: {
        message: dbError.message,
        code: dbError.errorCode!,
        statusCode: dbError.statusCode,
        details: dbError.details,
        timestamp,
        requestId,
        ...(process.env.NODE_ENV === "development" ? { stack: dbError.stack } : {})
      }
    };
  } else if (err instanceof Error) {
    // Generic JavaScript errors
    const statusCode = (err as any).statusCode || 
                      (err as any).status || 
                      STATUS_CODES.INTERNAL_SERVER_ERROR.code;
    
    errorResponse = {
      error: {
        message: err.message || STATUS_CODES.INTERNAL_SERVER_ERROR.message,
        code: 'INTERNAL_ERROR',
        statusCode,
        timestamp,
        requestId,
        ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {})
      }
    };
  } else {
    // Unknown error types
    errorResponse = {
      error: {
        message: STATUS_CODES.INTERNAL_SERVER_ERROR.message,
        code: 'UNKNOWN_ERROR',
        statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR.code,
        timestamp,
        requestId,
        ...(process.env.NODE_ENV === "development" ? { 
          stack: typeof err === 'object' ? JSON.stringify(err) : String(err) 
        } : {})
      }
    };
  }

  res.status(errorResponse.error.statusCode).json(errorResponse);
}