import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplogMiddleware } from './core/middleware/applog/applog.middleware';
import { APP_INTERCEPTOR_PROVIDERS, APP_MODULES } from './app.const';

@Module({
  imports: [...APP_MODULES],
  controllers: [AppController],
  providers: [AppService, ...APP_INTERCEPTOR_PROVIDERS],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApplogMiddleware).forRoutes('*');
  }
}
