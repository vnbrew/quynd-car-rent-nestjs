import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from 'src/config/typeorm-config/typeorm-config.module';
import { TypeOrmConfigService } from 'src/config/typeorm-config/typeorm-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigModule],
      inject: [TypeOrmConfigService],
      // useFactory: async (config: TypeOrmConfigService) => config.createTypeOrmOptions(),
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class DatabaseModule {}
