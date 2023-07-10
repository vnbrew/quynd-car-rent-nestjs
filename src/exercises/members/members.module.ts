import { Module } from "@nestjs/common";
import { MembersService } from "./members.service";
import { MembersController } from "./members.controller";
import { MemberFactory } from "./factory/member.factory";
import { AppExceptionModule } from "src/core/exception/app.exception.module";
import { membersProviders } from "./members.providers";

@Module({
  imports: [AppExceptionModule],
  controllers: [MembersController],
  providers: [MembersService, MemberFactory, ...membersProviders],
  exports: [MembersService, MemberFactory]
})
export class MembersModule {
}
