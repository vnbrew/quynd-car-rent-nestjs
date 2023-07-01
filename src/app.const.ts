import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { Scope } from '@nestjs/common';
import { MembersModule } from './exercises/members/members.module';
import { AppAllExceptionFilter } from './core/filter/app.exception.filter';
import { AppExceptionModule } from './core/exception/app.exception.module';
import { AppValidationPipe } from './core/pipe/app.validation.pipe';
import { AppLoggingInterceptor } from './core/interceptor/app.logging.interceptor';
import { AppResponseInterceptor } from './core/interceptor/app.response.interceptor';
import { CatsModule } from './exercises/cats/cats.module';
import { Member } from './exercises/members/entities/member.entity';
import { Cat } from './exercises/cats/entities/cat.entity';
import { AppLogModule } from './core/logger/console/app.log.module';
import { AppLogFileService } from './core/logger/file/app.log.file.service';
import { format, transports } from 'winston';
import { DatabaseModule } from './config/database/connections/database.module';

export const APP_INTERCEPTOR_PROVIDERS = [
  {
    provide: APP_INTERCEPTOR,
    scope: Scope.REQUEST,
    useClass: AppResponseInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    scope: Scope.REQUEST,
    useClass: AppLoggingInterceptor,
  },
  {
    provide: APP_PIPE,
    scope: Scope.REQUEST,
    useClass: AppValidationPipe,
  },
];

export const APP_EXCEPTION_PROVIDERS = [
  {
    provide: APP_FILTER,
    useClass: AppAllExceptionFilter,
  },
];

export const APP_MODULES_IMPORT = [
  AppLogModule,
  DatabaseModule,
  AppExceptionModule,
];

export const EXERCISES_MODULES_IMPORT = [MembersModule, CatsModule];

export const ENTITY_IMPORT = [Member, Cat];

export const globalLogger = new AppLogFileService({
  level: 'debug',
  format: format.combine(
    format.timestamp({ format: "isoDateTime" }),
    format.json(),
    format.colorize({ all: true }),
  ),
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
    new transports.Console(),
  ],
});
