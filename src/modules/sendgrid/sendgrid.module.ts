import { Module } from "@nestjs/common";
import { SendgridService } from "./sendgrid.service";
import { SendgridController } from "./sendgrid.controller";

@Module({
  controllers: [SendgridController],
  providers: [SendgridService],
  exports: [SendgridService]
})
export class SendgridModule {
}
