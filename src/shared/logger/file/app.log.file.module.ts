import { DynamicModule, FactoryProvider, Module } from '@nestjs/common';
import { LoggerOptions } from 'winston';
import {
  APP_LOG_FILE_CONFIG_OPTIONS,
  AppLogFileService,
} from './app.log.file.service';
import { getLoggerContexts, getLoggerToken } from './app.log.file.decorator';

@Module({})
export class AppLogFileModule {
  static forRoot(options: LoggerOptions): DynamicModule {
    const contexts = getLoggerContexts();

    const loggerProviders: FactoryProvider<AppLogFileService>[] = contexts.map(
      (context) => {
        return {
          provide: getLoggerToken(context),
          useFactory: () => {
            const logger = new AppLogFileService(options);
            logger.setContext(context);
            return logger;
          },
        };
      },
    );

    return {
      module: AppLogFileModule,
      providers: [
        {
          provide: APP_LOG_FILE_CONFIG_OPTIONS,
          useValue: options,
        },
        AppLogFileService,
        ...loggerProviders,
      ],
      exports: [
        AppLogFileService,
        ...contexts.map((context) => getLoggerToken(context)),
      ],
    };
  }
}
