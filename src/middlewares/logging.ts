import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

/**
 * Middleware to log API requests and responses
 * Tracks all actions on the API including timing and context
 */
export const apiLogger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();

  // Generate a simple request ID for tracking
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  // Store requestId in request for use in other middleware/controllers
  (req as any).requestId = requestId;

  // Log incoming request
  logger.apiRequest(req.method, req.path, {
    requestId,
    metadata: {
      userAgent: req.get('user-agent'),
      ip: req.ip || req.socket.remoteAddress,
      query: Object.keys(req.query).length > 0 ? req.query : undefined,
      body: req.method !== 'GET' && req.body ?
        (typeof req.body === 'object' ? Object.keys(req.body) : 'non-object') : undefined
    }
  });

  // Capture the original res.json and res.send methods
  const originalJson = res.json;
  const originalSend = res.send;

  // Override res.json to log response
  res.json = function(body: any) {
    const duration = Date.now() - startTime;
    logger.apiResponse(req.method, req.path, res.statusCode, duration, {
      requestId,
      metadata: {
        responseSize: JSON.stringify(body).length
      }
    });
    return originalJson.call(this, body);
  };

  // Override res.send to log response
  res.send = function(body: any) {
    const duration = Date.now() - startTime;
    logger.apiResponse(req.method, req.path, res.statusCode, duration, {
      requestId,
      metadata: {
        responseSize: body ? body.length || JSON.stringify(body).length : 0
      }
    });
    return originalSend.call(this, body);
  };

  // Handle cases where response ends without calling json/send
  res.on('finish', () => {
    // Only log if we haven't already logged (json/send weren't called)
    if (!res.headersSent || res.statusCode >= 400) {
      const duration = Date.now() - startTime;
      logger.apiResponse(req.method, req.path, res.statusCode, duration, {
        requestId
      });
    }
  });

  next();
};
