import { Module } from '@nestjs/common';
import { TypeOrmConfigService } from './typeorm.service';

@Module({
  providers: [TypeOrmConfigService],
  exports: [TypeOrmConfigService],
})
export class TypeOrmConfigModule {}
