import { Process, Processor } from '@nestjs/bull';
import { EProcessName, EQueueName } from '../../common/enum/queue.enum';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { CreateEmailDto } from '../email/dto/create-email.dto';

@Injectable()
@Processor(EQueueName.rental)
export class RentalProcessor {
  constructor(private readonly sendgridService: EmailService) {}

  @Process(EProcessName.booking_success)
  async handleBookingSuccess(job: Job) {
    const { user_name, pick_date_time, drop_date_time } = job.data;
    const letterToUser = new CreateEmailDto();
    letterToUser.to = ['nguyenducquy.qt@gmail.com'];
    letterToUser.from = 'quynd@tech.est-rouge.com';
    letterToUser.subject = 'Congratulations on successfully booking your car!';
    letterToUser.html = `
                      <p>Dear ${user_name}</p>
                      <p>We are pleased to inform you that your car booking has been successfully processed! We are delighted to let you know that the car will be ready to pick you up as requested.</p>
                      <p>Below are the details of your booking:</p>
                      <p>- Pick time: ${pick_date_time}</p>
                      <p>- Drop time: ${drop_date_time}</p>
                      <p>We hope that our car booking service will meet your expectations, and we will do our utmost to ensure you have a wonderful experience.</p>
                      <p>Thank you for your trust and for using our service!</p>
                      <p>Best regards,</p>
                      `;
    await this.sendgridService.sendEmail(letterToUser);
  }
}
