import { Injectable } from "@nestjs/common";
import { CreateSendgridDto } from "./dto/create-sendgrid.dto";
import * as sendGrid from "@sendgrid/mail";

@Injectable()
export class SendgridService {
  constructor() {
    sendGrid.setApiKey(process.env.SENDGRID_KEY);
  }

  async sendEmail(createSendgridDto: CreateSendgridDto) {
    try {
      const msg = {
        to: createSendgridDto.to,
        from: createSendgridDto.from,
        subject: createSendgridDto.subject,
        html: createSendgridDto.html
      };
      await sendGrid.sendMultiple(msg);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }

    return "This action adds a new sendgrid";
  }
}
