import { STATUS_CODES } from '../constants/statusCodes';
import AppError from './AppError';

export default class ServiceUnavailableError extends AppError {
  constructor(message: string = STATUS_CODES.SERVICE_UNAVAILABLE.message) {
    super(message, STATUS_CODES.SERVICE_UNAVAILABLE.code, true, 'SERVICE_UNAVAILABLE');
  }
}
