import { DatabaseModule } from './config/database/database.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { Scope } from '@nestjs/common';
import { MembersModule } from './exercises/members/members.module';
import { AppLogModule } from './core/log/app.log.module';
import { AppAllExceptionFilter } from './core/filter/app.exception.filter';
import { AppExceptionModule } from './core/exception/app.exception.module';
import { AppValidationPipe } from './core/pipe/app.validation.pipe';
import { AppLoggingInterceptor } from './core/interceptor/app.logging.interceptor';
import { AppResponseInterceptor } from './core/interceptor/app.response.interceptor';
import { CatsModule } from './exercises/cats/cats.module';
import { Member } from './exercises/members/entities/member.entity';
import { Cat } from './exercises/cats/entities/cat.entity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { MixedList } from 'typeorm/common/MixedList';

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
