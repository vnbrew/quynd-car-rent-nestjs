import { Injectable, Logger } from "@nestjs/common";
import { IAppLog } from "./app.log.interface";

@Injectable()
export class AppLogService extends Logger implements IAppLog {
  debug(context: string, message: string) {
    if (process.env.NODE_ENV !== "production") {
      super.debug(`[DEBUG] ${message}`, context);
    }
  }

  log(context: string, message: string) {
    super.log(`[INFO] ${message}`, context);
  }

  error(context: string, message: string, trace?: string) {
    super.error(`[ERROR] ${message}`, trace, context);
  }

  warn(context: string, message: string) {
    super.warn(`[WARN] ${message}`, context);
  }

  verbose(context: string, message: string) {
    if (process.env.NODE_ENV !== "production") {
      super.verbose(`[VERBOSE] ${message}`, context);
    }
  }
}