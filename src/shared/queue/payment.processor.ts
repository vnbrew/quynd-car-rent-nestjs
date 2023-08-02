import { Process, Processor } from '@nestjs/bull';
import { EProcessName, EQueueName } from '../../common/enum/queue.enum';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { CreateEmailDto } from '../email/dto/create-email.dto';

@Injectable()
@Processor(EQueueName.payment)
export class PaymentProcessor {
  constructor(private readonly sendgridService: EmailService) {}

  @Process(EProcessName.payment_completed)
  async handlePaymentCompleted(job: Job) {
    const { user_name, pay_date_time } = job.data;
    const letterToUser = new CreateEmailDto();
    letterToUser.to = ['nguyenducquy.qt@gmail.com'];
    letterToUser.from = 'quynd@tech.est-rouge.com';
    letterToUser.subject = 'Congratulations on successfully booking your car!';
    letterToUser.html = `
                      <p>Dear ${user_name}</p>
                      <p>I am writing to inform you that your payment has been successfully processed.</p>
                      <p>The payment was received and processed on ${pay_date_time}. All the information regarding this transaction has been carefully verified by our finance team.</p>
                      <p>Once again, we would like to express our sincere gratitude for your trust and support. Wishing you a great day and looking forward to serving you in the future.</p>
                      <p>Best regards,</p>
                      `;
    await this.sendgridService.sendEmail(letterToUser);
  }
}
