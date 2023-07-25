import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppAllExceptionFilter } from './shared/filter/app.exception.filter';
import { AppValidationPipe } from './shared/pipe/app.validation.pipe';
import { AppResponseInterceptor } from './shared/interceptor/app.response.interceptor';
import { AppLogFileService } from './shared/logger/file/app.log.file.service';
import { format, transports } from 'winston';
import { AuthGuard } from './shared/auth/auth.guard';
import { RolesGuard } from './shared/auth/roles.guard';
import 'winston-daily-rotate-file';

export const APP_INTERCEPTOR_PROVIDERS = [
  {
    provide: APP_INTERCEPTOR,
    useClass: AppResponseInterceptor,
  },
  {
    provide: APP_PIPE,
    useClass: AppValidationPipe,
  },
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
];

export const APP_EXCEPTION_PROVIDERS = [
  {
    provide: APP_FILTER,
    useClass: AppAllExceptionFilter,
  },
];

export const globalLogger = new AppLogFileService({
  level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
  silent: false,
  format: format.combine(
    format.timestamp({ format: 'isoDateTime' }),
    format.json(),
    format.colorize({ all: true }),
  ),
  transports: [
    new transports.DailyRotateFile(
      {
        filename: `logs/%DATE%-error.log`,
        datePattern: "YYYY-MM-DD",
        zippedArchive: false,
        maxFiles: "30d",
        level: "error"
      }
    ),
    new transports.DailyRotateFile(
      {
        filename: `logs/%DATE%-combined.log`,
        datePattern: "YYYY-MM-DD",
        zippedArchive: false,
        maxFiles: "30d"
      }
    ),
    new transports.Console()
  ]
});
