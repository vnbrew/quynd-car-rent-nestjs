import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { MembersModule } from "./exercises/members/members.module";
import { AppAllExceptionFilter } from "./core/filter/app.exception.filter";
import { AppValidationPipe } from "./core/pipe/app.validation.pipe";
import { AppLoggingInterceptor } from "./core/interceptor/app.logging.interceptor";
import { AppResponseInterceptor } from "./core/interceptor/app.response.interceptor";
import { AppLogFileService } from "./core/logger/file/app.log.file.service";
import { format, transports } from "winston";
import { AuthGuard } from "./modules/auth/auth.guard";
import { RolesGuard } from "./modules/auth/roles.guard";

export const APP_INTERCEPTOR_PROVIDERS = [
  {
    provide: APP_INTERCEPTOR,
    useClass: AppResponseInterceptor
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: AppLoggingInterceptor
  },
  {
    provide: APP_PIPE,
    useClass: AppValidationPipe
  },
  {
    provide: APP_GUARD,
    useClass: AuthGuard
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard
  }
];

export const APP_EXCEPTION_PROVIDERS = [
  {
    provide: APP_FILTER,
    useClass: AppAllExceptionFilter
  }
];

export const EXERCISES_MODULES_IMPORT = [MembersModule];

export const globalLogger = new AppLogFileService({
  level: "debug",
  silent: false,
  format: format.combine(
    format.timestamp({ format: "isoDateTime" }),
    format.json(),
    format.colorize({ all: true })
  ),
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
    new transports.Console()
  ]
});
