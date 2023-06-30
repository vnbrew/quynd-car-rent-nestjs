import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { DataServicesModule } from 'src/core/data-service/database.service.module';
import { MemberFactory } from './factory/member.factory';
import { AppExceptionModule } from 'src/core/exception/app.exception.module';

@Module({
  imports: [DataServicesModule, AppExceptionModule],
  controllers: [MembersController],
  providers: [MembersService, MemberFactory],
  exports: [MembersService, MemberFactory],
})
export class MembersModule {}
