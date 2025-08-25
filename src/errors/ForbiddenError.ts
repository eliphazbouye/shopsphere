import { STATUS_CODES } from '../constants/statusCodes';
import AppError from './AppError';

export default class ForbiddenError extends AppError {
  constructor(message: string = STATUS_CODES.FORBIDDEN.message) {
    super(message, STATUS_CODES.FORBIDDEN.code, true, 'FORBIDDEN');
  }
}
