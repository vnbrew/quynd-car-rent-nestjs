import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const method = req.method;
    const url = req.originalUrl;
    res.on('finish', () => {});
    next();
  }
}
