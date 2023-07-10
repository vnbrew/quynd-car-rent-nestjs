import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {
    APP_EXCEPTION_PROVIDERS,
    APP_INTERCEPTOR_PROVIDERS,
    APP_MODULES_IMPORT,
    EXERCISES_MODULES_IMPORT,
} from './app.const';
import {AppMiddleware} from './core/middleware/app.middleware';

@Module({
    imports: [...APP_MODULES_IMPORT, ...EXERCISES_MODULES_IMPORT,],
    providers: [
        ...APP_INTERCEPTOR_PROVIDERS,
        ...APP_EXCEPTION_PROVIDERS,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AppMiddleware).forRoutes('*');
    }
}
