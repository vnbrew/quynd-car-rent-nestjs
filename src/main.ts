import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  appendIdToRequest,
  appendRequestIdToLogger,
  morganRequestLogger,
  morganResponseLogger,
  AppLogFileInterceptor
} from "./shared/logger/file";
import { globalLogger } from "./app.const";
import { VersioningType } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

  app.enableVersioning({ type: VersioningType.URI });

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
