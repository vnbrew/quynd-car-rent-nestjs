import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {
  APP_EXCEPTION_PROVIDERS,
  APP_INTERCEPTOR_PROVIDERS,
} from './app.const';
import { AppMiddleware } from './shared/middleware/app.middleware';
import { DatabaseModule } from './shared/database/database.module';
import { AppExceptionModule } from './shared/exception/app.exception.module';
import { AppLanguageModule } from './shared/language/app.language.module';
import { UsersModule } from './modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { CarsModule } from './modules/cars/cars.module';
import { EmailModule } from './shared/email/email.module';
import { QueueModule } from './shared/queue/queue.module';
import { RedisCacheModule } from './shared/cache/rediscache.module';
import { TaskScheduleModule } from './shared/schedule/task-schedule.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_KEY}`,
      signOptions: { expiresIn: process.env.JWT_EXP_TIME },
    }),
    RedisCacheModule,
    DatabaseModule,
    AppExceptionModule,
    AppLanguageModule,
    UsersModule,
    CarsModule,
    EmailModule,
    QueueModule,
    TaskScheduleModule,
    OrdersModule,
  ],
  providers: [...APP_INTERCEPTOR_PROVIDERS, ...APP_EXCEPTION_PROVIDERS],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes('*');
  }
}
