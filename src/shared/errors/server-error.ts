import { ErrorCodes } from '../constants/error-codes';

export class ServerError extends Error {
  errorCode: ErrorCodes;

  constructor(errorCode: ErrorCodes, message: string) {
    super(message);
    this.name = 'ServerError';
    this.errorCode = errorCode;
  }
}
