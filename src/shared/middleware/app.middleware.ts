import { Injectable, NestMiddleware } from "@nestjs/common";
import { AppLogService } from "../logger/console/app.log.service";

@Injectable()
export class AppMiddleware implements NestMiddleware {
  constructor(private readonly logger: AppLogService) {
  }

  use(req: any, res: any, next: () => void) {
    const method = req.method;
    const url = req.originalUrl;
    this.logger.log(AppMiddleware.name, `Request ${method} ${url} started`);
    res.on("finish", () => {
      this.logger.log(AppMiddleware.name, `Request ${method} ${url} completed`);
    });
    next();
  }
}
