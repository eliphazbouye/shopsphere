"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    // Minimal error handler that sends JSON.
    // Expand for different error types (ZodError, Prisma.PrismaClientKnownRequestError, etc.)
    const status = (err && typeof err === "object" && "status" in err) ? err.status : 500;
    const message = (err && typeof err === "object" && "message" in err) ? err.message : "Internal Server Error";
    res.status(status).json({
        error: {
            message,
            // In non-production, include stack
            ...(process.env.NODE_ENV === "development" ? { stack: err?.stack } : {})
        }
    });
}
