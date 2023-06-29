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
import { AppLogService } from 'src/core/log/app.log.service';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, BaseResponse<T>>
{
  constructor(private readonly logger: AppLogService) {}

  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<BaseResponse<T>> {
    this.logger.log('Request has been received.', TransformInterceptor.name);
    return next.handle().pipe(
      map((data) => {
        this.logger.log(`Request has been completed`, TransformInterceptor.name);
        return generateResponse(data, '');
      }),
    );
  }
}

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLogService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.log('Request has been received.', ExcludeNullInterceptor.name);
    return next.handle().pipe(
      map((value) => {
        this.logger.log(`Request has been completed`, ExcludeNullInterceptor.name);
        return value === null ? '' : value;
      }),
    );
  }
}

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLogService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.log('Request has been received.', TimeoutInterceptor.name);
    return next.handle().pipe(
      timeout(5000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
      map((value) => {
        this.logger.log(`Request has been completed`, TimeoutInterceptor.name);
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
