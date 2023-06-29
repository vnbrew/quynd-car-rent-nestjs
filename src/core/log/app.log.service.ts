import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppLogService {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger();
  }

  log(message: string, context?: string): void {
    if (context) {
      this.logger.log(`${message}`, context);
    } else {
      this.logger.log(message);
    }
  }

  error(message: string, trace?: string, context?: string): void {
    if (context) {
      this.logger.error(`${message}`, trace, context);
    } else {
      this.logger.error(message, trace);
    }
  }

  warn(message: string, context?: string): void {
    if (context) {
      this.logger.warn(`${message}`, context);
    } else {
      this.logger.warn(message);
    }
  }

  debug(message: string, context?: string): void {
    if (context) {
      this.logger.debug(`${message}`, context);
    } else {
      this.logger.debug(message);
    }
  }

  verbose(message: string, context?: string): void {
    if (context) {
      this.logger.verbose(`${message}`, context);
    } else {
      this.logger.verbose(message);
    }
  }
}
