import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import {
  APP_EXCEPTION_PROVIDERS,
  APP_INTERCEPTOR_PROVIDERS,
  EXERCISES_MODULES_IMPORT
} from "./app.const";
import { AppMiddleware } from "./core/middleware/app.middleware";
import { AppLogModule } from "./core/logger/console/app.log.module";
import { DatabaseModule } from "./core/database/database.module";
import { AppExceptionModule } from "./core/exception/app.exception.module";
import { AppLanguageModule } from "./core/language/app.language.module";
import { UsersModule } from "./modules/users/users.module";
import { UsersController } from './modules/users/users.controller';

@Module({
  imports: [...EXERCISES_MODULES_IMPORT,
    AppLogModule,
    DatabaseModule,
    AppExceptionModule,
    AppLanguageModule,
    UsersModule
  ],
  providers: [
    ...APP_INTERCEPTOR_PROVIDERS,
    ...APP_EXCEPTION_PROVIDERS
  ],
  controllers: [UsersController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes("*");
  }
}
