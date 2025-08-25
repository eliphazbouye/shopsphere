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

class Logger {
  private getLogLevel(): LogLevel {
    return (process.env.LOG_LEVEL as LogLevel) || 'info';
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3
    };
    
    const currentLevel = levels[this.getLogLevel()];
    const messageLevel = levels[level];
    
    return messageLevel >= currentLevel;
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  debug(message: string, context?: LogContext): void {
    if (this.shouldLog('debug')) {
      // eslint-disable-next-line no-console
      console.debug(this.formatMessage('debug', message, context));
    }
  }

  info(message: string, context?: LogContext): void {
    if (this.shouldLog('info')) {
      // eslint-disable-next-line no-console
      console.info(this.formatMessage('info', message, context));
    }
  }

  warn(message: string, context?: LogContext): void {
    if (this.shouldLog('warn')) {
      // eslint-disable-next-line no-console
      console.warn(this.formatMessage('warn', message, context));
    }
  }

  error(message: string, error?: Error, context?: LogContext): void {
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
  apiRequest(method: string, path: string, context?: LogContext): void {
    this.info(`API Request: ${method} ${path}`, {
      ...context,
      action: 'api_request',
      metadata: { method, path }
    });
  }

  apiResponse(method: string, path: string, statusCode: number, duration: number, context?: LogContext): void {
    this.info(`API Response: ${method} ${path} - ${statusCode} (${duration}ms)`, {
      ...context,
      action: 'api_response',
      metadata: { method, path, statusCode, duration }
    });
  }

  apiError(method: string, path: string, error: Error, context?: LogContext): void {
    this.error(`API Error: ${method} ${path}`, error, {
      ...context,
      action: 'api_error',
      metadata: { method, path }
    });
  }

  databaseQuery(query: string, duration?: number, context?: LogContext): void {
    this.debug(`Database Query: ${query}${duration ? ` (${duration}ms)` : ''}`, {
      ...context,
      action: 'database_query',
      metadata: { query, duration }
    });
  }

  databaseError(query: string, error: Error, context?: LogContext): void {
    this.error(`Database Error: ${query}`, error, {
      ...context,
      action: 'database_error',
      metadata: { query }
    });
  }
}

export const logger = new Logger();