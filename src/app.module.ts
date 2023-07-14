import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import {
  APP_EXCEPTION_PROVIDERS,
  APP_INTERCEPTOR_PROVIDERS
} from "./app.const";
import { AppMiddleware } from "./core/middleware/app.middleware";
import { AppLogModule } from "./core/logger/console/app.log.module";
import { DatabaseModule } from "./core/database/database.module";
import { AppExceptionModule } from "./core/exception/app.exception.module";
import { AppLanguageModule } from "./core/language/app.language.module";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { CacheModule } from "@nestjs/cache-manager";
import { CarsModule } from './modules/cars/cars.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_KEY}`,
      signOptions: { expiresIn: process.env.JWT_EXP_TIME }
    }),
    CacheModule.register({ isGlobal: true }),
    AppLogModule,
    DatabaseModule,
    AppExceptionModule,
    AppLanguageModule,
    AuthModule,
    UsersModule,
    CarsModule,
  ],
  providers: [
    ...APP_INTERCEPTOR_PROVIDERS,
    ...APP_EXCEPTION_PROVIDERS
  ],
  controllers: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes("*");
  }
}
