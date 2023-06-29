import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplogMiddleware } from './core/middleware/applog/applog.middleware';
import { APP_EXCEPTION_PROVIDERS, APP_INTERCEPTOR_PROVIDERS, APP_MODULES_IMPORT } from './app.const';

@Module({
  imports: [...APP_MODULES_IMPORT],
  controllers: [AppController],
  providers: [
    AppService,
    ...APP_INTERCEPTOR_PROVIDERS,
    ...APP_EXCEPTION_PROVIDERS,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApplogMiddleware).forRoutes('*');
  }
}
