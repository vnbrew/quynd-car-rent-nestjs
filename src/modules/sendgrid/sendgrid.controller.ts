import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { SendgridService } from "./sendgrid.service";
import { CreateSendgridDto } from "./dto/create-sendgrid.dto";
import { SetRoles } from "../../core/constants";
import { Role } from "../../shared/enum/role";

@Controller("v1")
export class SendgridController {
  constructor(private readonly sendgridService: SendgridService) {
  }

  @HttpCode(204)
  @SetRoles(Role.admin)
  @Post("sendgrid/send-email")
  create(@Body() createSendgridDto: CreateSendgridDto) {
    return this.sendgridService.sendEmail(createSendgridDto);
  }
}
