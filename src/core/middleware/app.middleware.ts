import { Injectable, NestMiddleware } from '@nestjs/common';
import { AppLogService } from 'src/core/log/app.log.service';

@Injectable()
export class ApplogMiddleware implements NestMiddleware {
  constructor(private readonly logger: AppLogService) { }

  use(req: any, res: any, next: () => void) {
    const method = req.method;
    const url = req.originalUrl;
    this.logger.log(ApplogMiddleware.name, `Request ${method} ${url} started`);
    res.on('finish', () => {
      this.logger.log(ApplogMiddleware.name, `Request ${method} ${url} completed`);
    });
    next();
  }
}
