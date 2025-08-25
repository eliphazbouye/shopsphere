import { STATUS_CODES } from '../constants/statusCodes';
import AppError from './AppError';

export default class ValidationError extends AppError {
  constructor(message: string = STATUS_CODES.VALIDATION_ERROR.message, details?: unknown) {
    super(message, STATUS_CODES.VALIDATION_ERROR.code, true, 'VALIDATION_ERROR', details);
  }
}
