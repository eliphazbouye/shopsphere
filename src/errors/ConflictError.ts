import { STATUS_CODES } from '../constants/statusCodes';
import AppError from './AppError';

export default class ConflictError extends AppError {
  constructor(message: string = STATUS_CODES.CONFLICT.message, details?: unknown) {
    super(message, STATUS_CODES.CONFLICT.code, true, 'CONFLICT', details);
  }
}
