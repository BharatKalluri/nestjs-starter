import { ErrorCodes } from '../constants/error-codes';

export class ServerError extends Error {
  errorCode: ErrorCodes;
  statusCode: number;

  constructor(errorCode: ErrorCodes, message: string, statusCode: number) {
    super(message);
    this.name = 'ServerError';
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}
