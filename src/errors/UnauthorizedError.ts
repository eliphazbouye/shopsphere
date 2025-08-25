import { STATUS_CODES } from '../constants/statusCodes';
import AppError from './AppError';

export default class UnauthorizedError extends AppError {
  constructor(message: string = STATUS_CODES.UNAUTHORIZED.message) {
    super(message, STATUS_CODES.UNAUTHORIZED.code, true, 'UNAUTHORIZED');
  }
}
