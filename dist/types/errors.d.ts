/**
 * Base application error class
 */
export declare class AppError extends Error {
    readonly statusCode: number;
    readonly isOperational: boolean;
    readonly errorCode?: string;
    readonly details?: unknown;
    constructor(message: string, statusCode?: number, isOperational?: boolean, errorCode?: string, details?: unknown);
}
/**
 * Validation error for input validation failures
 */
export declare class ValidationError extends AppError {
    constructor(message?: string, details?: unknown);
}
/**
 * Not found error for missing resources
 */
export declare class NotFoundError extends AppError {
    constructor(message?: string, resource?: string);
}
/**
 * Authentication error for unauthorized access
 */
export declare class UnauthorizedError extends AppError {
    constructor(message?: string);
}
/**
 * Forbidden error for insufficient permissions
 */
export declare class ForbiddenError extends AppError {
    constructor(message?: string);
}
/**
 * Conflict error for resource conflicts
 */
export declare class ConflictError extends AppError {
    constructor(message?: string, details?: unknown);
}
/**
 * Database error for database-related issues
 */
export declare class DatabaseError extends AppError {
    constructor(message?: string, details?: unknown, originalError?: Error);
}
/**
 * Service unavailable error
 */
export declare class ServiceUnavailableError extends AppError {
    constructor(message?: string);
}
