import { STATUS_CODES } from '../constants/statusCodes';
import AppError from './AppError';

export default class NotFoundError extends AppError {
  constructor(message: string = STATUS_CODES.NOT_FOUND.message, resource?: string) {
    super(
      message,
      STATUS_CODES.NOT_FOUND.code,
      true,
      'NOT_FOUND',
      resource ? { resource } : undefined
    );
  }
}
