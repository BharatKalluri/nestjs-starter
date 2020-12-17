import { ServerMessages } from '../constants/server-messages';

export class ServerError extends Error {
  serverMessage: ServerMessages;
  statusCode?: number;

  constructor(errorCode: ServerMessages, message: string, statusCode?: number) {
    super(message);
    this.name = 'ServerError';
    this.serverMessage = errorCode;
    this.statusCode = statusCode;
  }
}
