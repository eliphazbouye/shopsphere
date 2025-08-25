import { STATUS_CODES } from '../constants/statusCodes';

/**
 * Base application error class
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errorCode?: string;
  public readonly details?: unknown;

  constructor(
    message: string,
    statusCode: number = STATUS_CODES.INTERNAL_SERVER_ERROR.code,
    isOperational: boolean = true,
    errorCode?: string,
    details?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorCode = errorCode;
    this.details = details;

    // Maintains proper stack trace for where error was thrown
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Validation error for input validation failures
 */
export class ValidationError extends AppError {
  constructor(message: string = STATUS_CODES.VALIDATION_ERROR.message, details?: unknown) {
    super(message, STATUS_CODES.VALIDATION_ERROR.code, true, 'VALIDATION_ERROR', details);
  }
}

/**
 * Not found error for missing resources
 */
export class NotFoundError extends AppError {
  constructor(message: string = STATUS_CODES.NOT_FOUND.message, resource?: string) {
    super(
      message, 
      STATUS_CODES.NOT_FOUND.code, 
      true, 
      'NOT_FOUND',
      resource ? { resource } : undefined
    );
  }
}

/**
 * Authentication error for unauthorized access
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = STATUS_CODES.UNAUTHORIZED.message) {
    super(message, STATUS_CODES.UNAUTHORIZED.code, true, 'UNAUTHORIZED');
  }
}

/**
 * Forbidden error for insufficient permissions
 */
export class ForbiddenError extends AppError {
  constructor(message: string = STATUS_CODES.FORBIDDEN.message) {
    super(message, STATUS_CODES.FORBIDDEN.code, true, 'FORBIDDEN');
  }
}

/**
 * Conflict error for resource conflicts
 */
export class ConflictError extends AppError {
  constructor(message: string = STATUS_CODES.CONFLICT.message, details?: unknown) {
    super(message, STATUS_CODES.CONFLICT.code, true, 'CONFLICT', details);
  }
}

/**
 * Database error for database-related issues
 */
export class DatabaseError extends AppError {
  constructor(
    message: string = STATUS_CODES.DATABASE_QUERY_ERROR.message, 
    details?: unknown,
    originalError?: Error
  ) {
    super(message, STATUS_CODES.DATABASE_QUERY_ERROR.code, true, 'DATABASE_ERROR', {
      details,
      originalError: originalError?.message
    });
  }
}

/**
 * Service unavailable error
 */
export class ServiceUnavailableError extends AppError {
  constructor(message: string = STATUS_CODES.SERVICE_UNAVAILABLE.message) {
    super(message, STATUS_CODES.SERVICE_UNAVAILABLE.code, true, 'SERVICE_UNAVAILABLE');
  }
}