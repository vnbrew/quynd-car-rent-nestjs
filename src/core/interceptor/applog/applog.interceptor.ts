import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Provider,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Observable, map } from 'rxjs';

@Injectable()
class AppLogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Request has been received.');
    const start = Date.now();
    return next.handle().pipe(
      map((data) => {
        console.log(`Request has been processed in ${Date.now() - start}ms.`);
        return data;
      }),
    );
  }
}

export const AppLogInterceptorProvider: Provider = {
  provide: APP_INTERCEPTOR,
  useClass: AppLogInterceptor,
};
