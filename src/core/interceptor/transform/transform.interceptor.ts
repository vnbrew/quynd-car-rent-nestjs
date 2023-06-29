import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { BaseResponse } from './base-response.interface';
import { LogService } from 'src/core/log/log.service';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, BaseResponse<T>>
{
  constructor(private readonly logger: LogService) {}

  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<BaseResponse<T>> {
    this.logger.info('Request has been received.')
    return next.handle().pipe(
      map((data) => {
        this.logger.info(`Request has been completed`);
        return generateResponse(data, '');
      }),
    );
  }
}

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  constructor(private readonly logger: LogService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.info('Request has been received.')
    return next.handle().pipe(
      map((value) => {
        this.logger.info(`Request has been completed`);
        return value === null ? '' : value;
      }),
    );
  }
}

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private readonly logger: LogService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.info('Request has been received.');
    return next.handle().pipe(
      timeout(5000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
      map((value) => {
        this.logger.info(`Request has been completed`);
        return value;
      }),
    );
  }
}

const generateResponse = <T>(data: T, message: string): BaseResponse<T> => {
  return {
    data,
    message,
    timestamp: Date.now(),
  };
};
