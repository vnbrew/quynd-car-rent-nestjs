import { Process, Processor } from "@nestjs/bull";
import { EProcessName, EQueueName } from "../../shared/enum/queue.enum";
import { Job } from "bull";
import { Injectable } from "@nestjs/common";
import { SendgridService } from "../sendgrid/sendgrid.service";
import { CreateSendgridDto } from "../sendgrid/dto/create-sendgrid.dto";
import { RentalService } from "../rental/rental.service";

@Injectable()
@Processor(EQueueName.register)
export class RegisterProcessor {

  constructor(
    private readonly sendgridService: SendgridService
  ) {
  }

  @Process(EProcessName.register_completed)
  async handleRental(job: Job) {
    let { user_name } = job.data;
    let letterToUser = new CreateSendgridDto();
    letterToUser.to = ["nguyenducquy.qt@gmail.com"];
    letterToUser.from = "quynd@tech.est-rouge.com";
    letterToUser.subject = "Congratulations!";
    letterToUser.html = `
                      <p>Dear ${user_name}</p>
                      <p>Congratulations on successfully registering your account!</p>
                      <p>Best regards,</p>
                      `;
    await this.sendgridService.sendEmail(letterToUser);
  }
}