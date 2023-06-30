import { Module } from '@nestjs/common';
import { AbsDataServices } from 'src/core/base/abstracts/data.service.abstract';
import { MySQLDataService } from './mysql.database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/exercises/members/entities/member.entity';
import { Cat } from 'src/exercises/cats/entities/cat.entity';

const EntityClass_Schema = [Member, Cat];

@Module({
  imports: [TypeOrmModule.forFeature(EntityClass_Schema)],
  providers: [
    {
      provide: AbsDataServices,
      useClass: MySQLDataService,
    },
  ],
  exports: [AbsDataServices],
})
export class MySQLDataServiceModule {}
