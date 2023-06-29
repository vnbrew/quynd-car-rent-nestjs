import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { LogService } from 'src/core/log/log.service';

@Injectable()
export class ApplogMiddleware implements NestMiddleware {
  constructor(private readonly logger: LogService) {}

  use(req: any, res: any, next: () => void) {
    const method = req.method;
    const url = req.originalUrl;
    this.logger.info(`Request ${method} ${url} started`);
    res.on('finish', () => {
      this.logger.info(`Request ${method} ${url} completed`);
    });
    next();
  }
}
