import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as messages from '../../../messages.json';
import { ServerError } from '../errors/server-error';
import * as _ from 'lodash';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err: Error) => {
        if (err instanceof ServerError) {
          const errorCode = err.serverMessage;
          const statusCode = err.statusCode;
          const isMessagePresentForCode: boolean = messages.hasOwnProperty(
            errorCode,
          );

          if (!isMessagePresentForCode) {
            // TODO: Move from console errors to logger based errors
            console.error(`Error message missing for error code ${errorCode}`);
            return throwError(new InternalServerErrorException(err.message));
          }

          return throwError(
            new HttpException(
              {
                errorCode,
                message: _.get(messages, `${errorCode.toString()}.en`),
              },
              statusCode || 500,
            ),
          );
        }
        return throwError(err);
      }),
    );
  }
}
