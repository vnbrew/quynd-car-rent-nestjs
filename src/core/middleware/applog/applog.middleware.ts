import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ApplogMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const method = req.method;
    const url = req.originalUrl;
    console.log(`Request ${method} ${url} started`);
    res.on('finish', () => {
      console.log(`Request ${method} ${url} completed`);
    });
    next();
  }
}
