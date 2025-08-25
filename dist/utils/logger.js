"use strict";
/**
 * Enhanced logger utility for comprehensive API logging
 * Supports different log levels and structured logging
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
class Logger {
    getLogLevel() {
        return process.env.LOG_LEVEL || 'info';
    }
    shouldLog(level) {
        const levels = {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3
        };
        const currentLevel = levels[this.getLogLevel()];
        const messageLevel = levels[level];
        return messageLevel >= currentLevel;
    }
    formatMessage(level, message, context) {
        const timestamp = new Date().toISOString();
        const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : '';
        return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
    }
    debug(message, context) {
        if (this.shouldLog('debug')) {
            // eslint-disable-next-line no-console
            console.debug(this.formatMessage('debug', message, context));
        }
    }
    info(message, context) {
        if (this.shouldLog('info')) {
            // eslint-disable-next-line no-console
            console.info(this.formatMessage('info', message, context));
        }
    }
    warn(message, context) {
        if (this.shouldLog('warn')) {
            // eslint-disable-next-line no-console
            console.warn(this.formatMessage('warn', message, context));
        }
    }
    error(message, error, context) {
        if (this.shouldLog('error')) {
            const errorContext = error ? {
                ...context,
                error: {
                    name: error.name,
                    message: error.message,
                    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
                }
            } : context;
            // eslint-disable-next-line no-console
            console.error(this.formatMessage('error', message, errorContext));
        }
    }
    // API-specific logging methods
    apiRequest(method, path, context) {
        this.info(`API Request: ${method} ${path}`, {
            ...context,
            action: 'api_request',
            metadata: { method, path }
        });
    }
    apiResponse(method, path, statusCode, duration, context) {
        this.info(`API Response: ${method} ${path} - ${statusCode} (${duration}ms)`, {
            ...context,
            action: 'api_response',
            metadata: { method, path, statusCode, duration }
        });
    }
    apiError(method, path, error, context) {
        this.error(`API Error: ${method} ${path}`, error, {
            ...context,
            action: 'api_error',
            metadata: { method, path }
        });
    }
    databaseQuery(query, duration, context) {
        this.debug(`Database Query: ${query}${duration ? ` (${duration}ms)` : ''}`, {
            ...context,
            action: 'database_query',
            metadata: { query, duration }
        });
    }
    databaseError(query, error, context) {
        this.error(`Database Error: ${query}`, error, {
            ...context,
            action: 'database_error',
            metadata: { query }
        });
    }
}
exports.logger = new Logger();
//# sourceMappingURL=logger.js.map