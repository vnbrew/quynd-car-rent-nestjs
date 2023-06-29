import { Module } from '@nestjs/common';
import { TypeOrmConfigService } from './typeorm-config.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TypeOrmConfigService],
  exports: [TypeOrmConfigService],
})
export class TypeOrmConfigModule {}
