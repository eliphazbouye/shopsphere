/**
 * Enhanced logger utility for comprehensive API logging
 * Supports different log levels and structured logging
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
interface LogContext {
    requestId?: string;
    userId?: string;
    action?: string;
    resource?: string;
    metadata?: Record<string, unknown>;
}
declare class Logger {
    private getLogLevel;
    private shouldLog;
    private formatMessage;
    debug(message: string, context?: LogContext): void;
    info(message: string, context?: LogContext): void;
    warn(message: string, context?: LogContext): void;
    error(message: string, error?: Error, context?: LogContext): void;
    apiRequest(method: string, path: string, context?: LogContext): void;
    apiResponse(method: string, path: string, statusCode: number, duration: number, context?: LogContext): void;
    apiError(method: string, path: string, error: Error, context?: LogContext): void;
    databaseQuery(query: string, duration?: number, context?: LogContext): void;
    databaseError(query: string, error: Error, context?: LogContext): void;
}
export declare const logger: Logger;
export {};
