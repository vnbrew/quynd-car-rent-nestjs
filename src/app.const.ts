import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { AllExceptionsFilter } from './core/exception/all-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppLogInterceptor } from './core/interceptor/applog/applog.interceptor';
import { Scope } from '@nestjs/common';
import {
  ExcludeNullInterceptor,
  TimeoutInterceptor,
  TransformInterceptor,
} from './core/interceptor/transform/transform.interceptor';
import { MembersModule } from './exercises/members/members.module';
import { AppLogModule } from './core/log/app.log.module';

export const APP_INTERCEPTOR_PROVIDERS = [
  {
    provide: APP_INTERCEPTOR,
    scope: Scope.REQUEST,
    useClass: AppLogInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    scope: Scope.REQUEST,
    useClass: TransformInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    scope: Scope.REQUEST,
    useClass: ExcludeNullInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    scope: Scope.REQUEST,
    useClass: TimeoutInterceptor,
  },
];

export const APP_EXCEPTION_PROVIDERS = [
  {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },
];

export const APP_MODULES_IMPORT = [
  ConfigModule.forRoot({
    envFilePath: ['.env.dev.local'],
  }),
  AppLogModule,
  DatabaseModule,
];

export const EXERCISES_MODULES_IMPORT = [MembersModule];
