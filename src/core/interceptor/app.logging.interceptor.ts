import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppLogService } from '../log/console/app.log.service';

@Injectable()
export class AppLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    const ip = this.getIP(request);

    this.logger.log(AppLoggingInterceptor.name, `Incoming Request on ${request.path} method=${request.method} ip=${ip}`);

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          AppLoggingInterceptor.name, 
          `End Request for ${request.path} method=${request.method} ip=${ip} duration=${Date.now() - now}ms`,
        );
      }),
    );
  }

  private getIP(request: any): string {
    let ip: string;
    const ipAddr = request.headers['x-forwarded-for'];
    if (ipAddr) {
      const list = ipAddr.split(',');
      ip = list[list.length - 1];
    } else {
      ip = request.connection.remoteAddress;
    }
    return ip.replace('::ffff:', '');
  }
}
