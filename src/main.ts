import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  appendIdToRequest,
  appendRequestIdToLogger,
  morganRequestLogger,
  morganResponseLogger,
  AppLogFileInterceptor,
} from './shared/logger/file';
import { globalLogger } from './app.const';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableVersioning({ type: VersioningType.URI });

  //LogFile
  app.useLogger(globalLogger);
  app.use(appendIdToRequest);
  app.use(appendRequestIdToLogger(globalLogger));
  app.use(morganRequestLogger(globalLogger));
  app.use(morganResponseLogger(globalLogger));
  app.useGlobalInterceptors(new AppLogFileInterceptor(globalLogger));

  await app.listen(process.env.APP_PORT);
}

bootstrap()
  .then(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Server running!');
    }
  })
  .catch((error) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Server error!' + error);
    }
  });
