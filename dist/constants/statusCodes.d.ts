/**
 * HTTP Status Codes with descriptions for consistent usage across the application
 */
export declare const STATUS_CODES: {
    readonly OK: {
        readonly code: 200;
        readonly message: "Success";
    };
    readonly CREATED: {
        readonly code: 201;
        readonly message: "Resource created successfully";
    };
    readonly ACCEPTED: {
        readonly code: 202;
        readonly message: "Request accepted for processing";
    };
    readonly NO_CONTENT: {
        readonly code: 204;
        readonly message: "No content to return";
    };
    readonly BAD_REQUEST: {
        readonly code: 400;
        readonly message: "Bad request - Invalid input data";
    };
    readonly UNAUTHORIZED: {
        readonly code: 401;
        readonly message: "Authentication required";
    };
    readonly FORBIDDEN: {
        readonly code: 403;
        readonly message: "Access forbidden - Insufficient permissions";
    };
    readonly NOT_FOUND: {
        readonly code: 404;
        readonly message: "Resource not found";
    };
    readonly METHOD_NOT_ALLOWED: {
        readonly code: 405;
        readonly message: "HTTP method not allowed";
    };
    readonly CONFLICT: {
        readonly code: 409;
        readonly message: "Resource conflict";
    };
    readonly VALIDATION_ERROR: {
        readonly code: 422;
        readonly message: "Validation failed";
    };
    readonly RATE_LIMIT_EXCEEDED: {
        readonly code: 429;
        readonly message: "Too many requests";
    };
    readonly INTERNAL_SERVER_ERROR: {
        readonly code: 500;
        readonly message: "Internal server error";
    };
    readonly NOT_IMPLEMENTED: {
        readonly code: 501;
        readonly message: "Feature not implemented";
    };
    readonly BAD_GATEWAY: {
        readonly code: 502;
        readonly message: "Bad gateway";
    };
    readonly SERVICE_UNAVAILABLE: {
        readonly code: 503;
        readonly message: "Service temporarily unavailable";
    };
    readonly GATEWAY_TIMEOUT: {
        readonly code: 504;
        readonly message: "Gateway timeout";
    };
    readonly DATABASE_CONNECTION_ERROR: {
        readonly code: 503;
        readonly message: "Database connection failed";
    };
    readonly DATABASE_QUERY_ERROR: {
        readonly code: 500;
        readonly message: "Database query failed";
    };
    readonly DUPLICATE_ENTRY: {
        readonly code: 409;
        readonly message: "Duplicate entry - Resource already exists";
    };
};
export type StatusCode = typeof STATUS_CODES[keyof typeof STATUS_CODES];
