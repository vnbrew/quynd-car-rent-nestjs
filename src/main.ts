import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { AppLogFileService } from './core/log/file/app.log.file.service';
import { format, transports } from "winston";
import { appendIdToRequest, appendRequestIdToLogger, morganRequestLogger, morganResponseLogger, AppLogFileInterceptor } from './core/log/file';
import { globalLogger } from './app.const';

async function bootstrap() {
  config()
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')

  //LogFile
  app.useLogger(globalLogger);
  app.use(appendIdToRequest);
  app.use(appendRequestIdToLogger(globalLogger));
  app.use(morganRequestLogger(globalLogger));
  app.use(morganResponseLogger(globalLogger));
  app.useGlobalInterceptors(new AppLogFileInterceptor(globalLogger));

  const port = 3000;
  await app.listen(port).then(() => {
    console.log(`🚀 Server ready at ${port}`);
  });
}
bootstrap();
