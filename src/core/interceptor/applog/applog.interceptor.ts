import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { AppLogService } from 'src/core/log/app.log.service';

@Injectable()
export class AppLogInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLogService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.log('Request has been received.', AppLogInterceptor.name);
    const start = Date.now();
    return next.handle().pipe(
      map((data) => {
        this.logger.log(`Request has been processed in ${Date.now() - start}ms.`, AppLogInterceptor.name);
        return data;
      }),
    );
  }
}
