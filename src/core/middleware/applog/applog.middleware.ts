import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { AppLogService } from 'src/core/log/app.log.service';

@Injectable()
export class ApplogMiddleware implements NestMiddleware {
  constructor(private readonly logger: AppLogService) {}

  use(req: any, res: any, next: () => void) {
    const method = req.method;
    const url = req.originalUrl;
    this.logger.log(`Request ${method} ${url} started`, ApplogMiddleware.name);
    res.on('finish', () => {
      this.logger.log(`Request ${method} ${url} completed`, ApplogMiddleware.name);
    });
    next();
  }
}
