"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUnavailableError = exports.DatabaseError = exports.ConflictError = exports.ForbiddenError = exports.UnauthorizedError = exports.NotFoundError = exports.ValidationError = exports.AppError = void 0;
const statusCodes_1 = require("../constants/statusCodes");
/**
 * Base application error class
 */
class AppError extends Error {
    statusCode;
    isOperational;
    errorCode;
    details;
    constructor(message, statusCode = statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR.code, isOperational = true, errorCode, details) {
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
exports.AppError = AppError;
/**
 * Validation error for input validation failures
 */
class ValidationError extends AppError {
    constructor(message = statusCodes_1.STATUS_CODES.VALIDATION_ERROR.message, details) {
        super(message, statusCodes_1.STATUS_CODES.VALIDATION_ERROR.code, true, 'VALIDATION_ERROR', details);
    }
}
exports.ValidationError = ValidationError;
/**
 * Not found error for missing resources
 */
class NotFoundError extends AppError {
    constructor(message = statusCodes_1.STATUS_CODES.NOT_FOUND.message, resource) {
        super(message, statusCodes_1.STATUS_CODES.NOT_FOUND.code, true, 'NOT_FOUND', resource ? { resource } : undefined);
    }
}
exports.NotFoundError = NotFoundError;
/**
 * Authentication error for unauthorized access
 */
class UnauthorizedError extends AppError {
    constructor(message = statusCodes_1.STATUS_CODES.UNAUTHORIZED.message) {
        super(message, statusCodes_1.STATUS_CODES.UNAUTHORIZED.code, true, 'UNAUTHORIZED');
    }
}
exports.UnauthorizedError = UnauthorizedError;
/**
 * Forbidden error for insufficient permissions
 */
class ForbiddenError extends AppError {
    constructor(message = statusCodes_1.STATUS_CODES.FORBIDDEN.message) {
        super(message, statusCodes_1.STATUS_CODES.FORBIDDEN.code, true, 'FORBIDDEN');
    }
}
exports.ForbiddenError = ForbiddenError;
/**
 * Conflict error for resource conflicts
 */
class ConflictError extends AppError {
    constructor(message = statusCodes_1.STATUS_CODES.CONFLICT.message, details) {
        super(message, statusCodes_1.STATUS_CODES.CONFLICT.code, true, 'CONFLICT', details);
    }
}
exports.ConflictError = ConflictError;
/**
 * Database error for database-related issues
 */
class DatabaseError extends AppError {
    constructor(message = statusCodes_1.STATUS_CODES.DATABASE_QUERY_ERROR.message, details, originalError) {
        super(message, statusCodes_1.STATUS_CODES.DATABASE_QUERY_ERROR.code, true, 'DATABASE_ERROR', {
            details,
            originalError: originalError?.message
        });
    }
}
exports.DatabaseError = DatabaseError;
/**
 * Service unavailable error
 */
class ServiceUnavailableError extends AppError {
    constructor(message = statusCodes_1.STATUS_CODES.SERVICE_UNAVAILABLE.message) {
        super(message, statusCodes_1.STATUS_CODES.SERVICE_UNAVAILABLE.code, true, 'SERVICE_UNAVAILABLE');
    }
}
exports.ServiceUnavailableError = ServiceUnavailableError;
//# sourceMappingURL=errors.js.map