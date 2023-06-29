import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { LogService } from 'src/core/log/log.service';

@Injectable()
export class AppLogInterceptor implements NestInterceptor {
  constructor(private readonly logger: LogService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.info('Request has been received.');
    const start = Date.now();
    return next.handle().pipe(
      map((data) => {
        this.logger.info(`Request has been processed in ${Date.now() - start}ms.`);
        return data;
      }),
    );
  }
}
