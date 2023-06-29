import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../typeorm-config/typeorm-config.service';
import { TypeOrmConfigModule } from '../typeorm-config/typeorm-config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigModule],
      inject: [TypeOrmConfigService],
      useFactory: async (config: TypeOrmConfigService) => config.createTypeOrmOptions(),
      // useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class DatabaseModule {}
