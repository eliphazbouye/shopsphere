"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
const logger_1 = require("../utils/logger");
const statusCodes_1 = require("../constants/statusCodes");
const errors_1 = require("../types/errors");
/**
 * Enhanced error handler middleware that handles different error types
 * and provides consistent error responses with proper logging
 */
function errorHandler(err, req, res, next) {
    const requestId = req.requestId;
    const timestamp = new Date().toISOString();
    // Log the error
    logger_1.logger.apiError(req.method, req.path, err, {
        requestId,
        metadata: {
            userAgent: req.get('user-agent'),
            ip: req.ip || req.connection.remoteAddress
        }
    });
    let errorResponse;
    // Handle different error types
    if (err instanceof errors_1.AppError) {
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
    }
    else if (err instanceof zod_1.ZodError) {
        // Zod validation errors
        const validationError = new errors_1.ValidationError("Validation failed", {
            issues: err.issues.map((issue) => ({
                path: issue.path.join('.'),
                message: issue.message,
                code: issue.code
            }))
        });
        errorResponse = {
            error: {
                message: validationError.message,
                code: validationError.errorCode,
                statusCode: validationError.statusCode,
                details: validationError.details,
                timestamp,
                requestId,
                ...(process.env.NODE_ENV === "development" ? { stack: validationError.stack } : {})
            }
        };
    }
    else if (err && typeof err === 'object' && 'code' in err && typeof err.code === 'string') {
        // Handle database-like errors (including Prisma errors)
        const dbErr = err;
        let dbError;
        switch (dbErr.code) {
            case 'P2002':
                dbError = new errors_1.DatabaseError(statusCodes_1.STATUS_CODES.DUPLICATE_ENTRY.message, {
                    constraint: dbErr.meta?.target,
                    originalCode: dbErr.code
                });
                // Create new error with correct status code
                const duplicateError = new errors_1.DatabaseError(statusCodes_1.STATUS_CODES.DUPLICATE_ENTRY.message, dbError.details);
                Object.defineProperty(duplicateError, 'statusCode', {
                    value: statusCodes_1.STATUS_CODES.DUPLICATE_ENTRY.code,
                    writable: false
                });
                dbError = duplicateError;
                break;
            case 'P2025':
                dbError = new errors_1.DatabaseError(statusCodes_1.STATUS_CODES.NOT_FOUND.message, {
                    originalCode: dbErr.code
                });
                const notFoundError = new errors_1.DatabaseError(statusCodes_1.STATUS_CODES.NOT_FOUND.message, dbError.details);
                Object.defineProperty(notFoundError, 'statusCode', {
                    value: statusCodes_1.STATUS_CODES.NOT_FOUND.code,
                    writable: false
                });
                dbError = notFoundError;
                break;
            default:
                dbError = new errors_1.DatabaseError(statusCodes_1.STATUS_CODES.DATABASE_QUERY_ERROR.message, {
                    originalCode: dbErr.code,
                    meta: dbErr.meta
                });
        }
        errorResponse = {
            error: {
                message: dbError.message,
                code: dbError.errorCode,
                statusCode: dbError.statusCode,
                details: dbError.details,
                timestamp,
                requestId,
                ...(process.env.NODE_ENV === "development" ? { stack: dbError.stack } : {})
            }
        };
    }
    else if (err instanceof Error) {
        // Generic JavaScript errors
        const statusCode = err.statusCode ||
            err.status ||
            statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR.code;
        errorResponse = {
            error: {
                message: err.message || statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR.message,
                code: 'INTERNAL_ERROR',
                statusCode,
                timestamp,
                requestId,
                ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {})
            }
        };
    }
    else {
        // Unknown error types
        errorResponse = {
            error: {
                message: statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR.message,
                code: 'UNKNOWN_ERROR',
                statusCode: statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR.code,
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
//# sourceMappingURL=errorHandler.js.map