import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENTITY_IMPORT } from 'src/app.const';
import { MIGRATIONS_FILE_NAME } from 'src/migrations';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ENTITY_IMPORT,
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
      migrationsRun: true,
      migrations: MIGRATIONS_FILE_NAME,
      subscribers: [],
    };
  }
}
