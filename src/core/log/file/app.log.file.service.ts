import { Inject, Injectable, ConsoleLogger, Scope } from "@nestjs/common";
import { createLogger, LoggerOptions, Logger as WinstonLogger } from "winston";

export const APP_LOG_FILE_CONFIG_OPTIONS = "APP_LOG_FILE_CONFIG_OPTIONS";

export const LOG_TYPE = {
  REQUEST_ARGS: "Request args",
  RESPONSE_RESULT: "Response result",
};

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogFileService extends ConsoleLogger {
  private logger: WinstonLogger;

  constructor(@Inject(APP_LOG_FILE_CONFIG_OPTIONS) config: LoggerOptions) {
    super();
    this.logger = createLogger(config);
  }

  setContext(serviceName: string) {
    this.logger.defaultMeta = {
      ...this.logger.defaultMeta,
      service: serviceName,
    };
  }

  appendDefaultMeta(key: string, value: string) {
    this.logger.defaultMeta = {
      ...this.logger.defaultMeta,
      [key]: value,
    };
  }

  log(message: string) {
    this.logger.info(message);
  }
  error(message: string) {
    this.logger.error(message);
  }
  warn(message: string) {
    this.logger.warn(message);
  }
  debug(message: string) {
    this.logger.debug(message);
  }
  verbose(message: string) {
    this.logger.verbose(message);
  }
}
