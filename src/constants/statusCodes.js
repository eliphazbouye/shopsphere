"use strict";
/**
 * HTTP Status Codes with descriptions for consistent usage across the application
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_CODES = void 0;
exports.STATUS_CODES = {
    // 2xx Success
    OK: {
        code: 200,
        message: 'Success'
    },
    CREATED: {
        code: 201,
        message: 'Resource created successfully'
    },
    ACCEPTED: {
        code: 202,
        message: 'Request accepted for processing'
    },
    NO_CONTENT: {
        code: 204,
        message: 'No content to return'
    },
    // 4xx Client Errors
    BAD_REQUEST: {
        code: 400,
        message: 'Bad request - Invalid input data'
    },
    UNAUTHORIZED: {
        code: 401,
        message: 'Authentication required'
    },
    FORBIDDEN: {
        code: 403,
        message: 'Access forbidden - Insufficient permissions'
    },
    NOT_FOUND: {
        code: 404,
        message: 'Resource not found'
    },
    METHOD_NOT_ALLOWED: {
        code: 405,
        message: 'HTTP method not allowed'
    },
    CONFLICT: {
        code: 409,
        message: 'Resource conflict'
    },
    VALIDATION_ERROR: {
        code: 422,
        message: 'Validation failed'
    },
    RATE_LIMIT_EXCEEDED: {
        code: 429,
        message: 'Too many requests'
    },
    // 5xx Server Errors
    INTERNAL_SERVER_ERROR: {
        code: 500,
        message: 'Internal server error'
    },
    NOT_IMPLEMENTED: {
        code: 501,
        message: 'Feature not implemented'
    },
    BAD_GATEWAY: {
        code: 502,
        message: 'Bad gateway'
    },
    SERVICE_UNAVAILABLE: {
        code: 503,
        message: 'Service temporarily unavailable'
    },
    GATEWAY_TIMEOUT: {
        code: 504,
        message: 'Gateway timeout'
    },
    // Database Errors
    DATABASE_CONNECTION_ERROR: {
        code: 503,
        message: 'Database connection failed'
    },
    DATABASE_QUERY_ERROR: {
        code: 500,
        message: 'Database query failed'
    },
    DUPLICATE_ENTRY: {
        code: 409,
        message: 'Duplicate entry - Resource already exists'
    }
};
