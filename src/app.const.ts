import { ConfigModule } from '@nestjs/config';
import { AppLogInterceptorProvider } from './core/interceptor/applog/applog.interceptor';
import { DatabaseModule } from './config/database/database.module';

export const APP_INTERCEPTOR_PROVIDERS = [AppLogInterceptorProvider];

export const APP_MODULES = [
  ConfigModule.forRoot({
    envFilePath: ['.env.dev.local'],
  }),
  DatabaseModule,
];
