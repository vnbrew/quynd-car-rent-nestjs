import { Process, Processor } from '@nestjs/bull';
import { EProcessName, EQueueName } from '../../common/enum/queue.enum';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { CreateEmailDto } from '../email/dto/create-email.dto';

@Injectable()
@Processor(EQueueName.register)
export class RegisterProcessor {
  constructor(private readonly sendgridService: EmailService) {}

  @Process(EProcessName.register_completed)
  async handleRegisterCompleted(job: Job) {
    const { user_name } = job.data;
    const letterToUser = new CreateEmailDto();
    letterToUser.to = ['nguyenducquy.qt@gmail.com'];
    letterToUser.from = 'quynd@tech.est-rouge.com';
    letterToUser.subject = 'Congratulations!';
    letterToUser.html = `
                      <p>Dear ${user_name}</p>
                      <p>Congratulations on successfully registering your account!</p>
                      <p>Best regards,</p>
                      `;
    await this.sendgridService.sendEmail(letterToUser);
  }
}
