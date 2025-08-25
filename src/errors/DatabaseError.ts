import { STATUS_CODES } from '../constants/statusCodes';
import AppError from './AppError';

export default class DatabaseError extends AppError {
  constructor(
    message: string = STATUS_CODES.DATABASE_QUERY_ERROR.message,
    details?: unknown,
    originalError?: Error
  ) {
    super(message, STATUS_CODES.DATABASE_QUERY_ERROR.code, true, 'DATABASE_ERROR', {
      details,
      originalError: originalError?.message
    });
  }
}
