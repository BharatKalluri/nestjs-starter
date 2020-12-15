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
import * as errorCodes from '../../../errorCodes.json';
import { ServerError } from '../errors/server-error';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err: Error) => {
        if (err instanceof ServerError) {
          const errorCode = err.errorCode;
          const isMessagePresentForCode: boolean = errorCodes.hasOwnProperty(
            errorCode,
          );
          if (!isMessagePresentForCode) {
            console.error(`Error message missing for error code ${errorCode}`);
            return throwError(new InternalServerErrorException(err.message));
          }
          return throwError(
            new HttpException(
              {
                errorCode,
                message: errorCodes[errorCode.toString()],
              },
              500,
            ),
          );
        }
        return throwError(err);
      }),
    );
  }
}
