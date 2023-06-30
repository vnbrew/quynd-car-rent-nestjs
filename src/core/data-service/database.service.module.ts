import { Module } from '@nestjs/common';
import { MySQLDataServiceModule } from './mysql/mysql.database.module';

@Module({
  imports: [MySQLDataServiceModule],
  exports: [MySQLDataServiceModule],
})
export class DataServicesModule {}
