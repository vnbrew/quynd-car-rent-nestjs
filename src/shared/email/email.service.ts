import { Injectable } from "@nestjs/common";
import { CreateEmailDto } from "./dto/create-email.dto";
import * as sendGrid from "@sendgrid/mail";

@Injectable()
export class EmailService {
  constructor() {
    sendGrid.setApiKey(process.env.SENDGRID_KEY);
  }

  async sendEmail(createSendgridDto: CreateEmailDto) {
    const msg = {
      to: createSendgridDto.to,
      from: createSendgridDto.from,
      subject: createSendgridDto.subject,
      html: createSendgridDto.html
    };
    await sendGrid.sendMultiple(msg);
    return {};
  }
}
