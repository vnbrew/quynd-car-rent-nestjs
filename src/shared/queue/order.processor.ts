import { Process, Processor } from '@nestjs/bull';
import { EProcessName, EQueueName } from '../../common/enum/queue.enum';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { CreateEmailDto } from '../email/dto/create-email.dto';

@Injectable()
@Processor(EQueueName.order)
export class OrderProcessor {
  constructor(private readonly sendgridService: EmailService) {}

  @Process(EProcessName.create_order)
  async createOrder(job: Job) {
    let { user_name, pick_date_time, drop_date_time } = job.data;
    let letterToUser = new CreateEmailDto();
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

  // @Process(EProcessName.pay_order)
  // async payOrder(job: Job) {
  //   let { user_name, paid_date_time } = job.data;
  //   let letterToUser = new CreateEmailDto();
  //   letterToUser.to = ['nguyenducquy.qt@gmail.com'];
  //   letterToUser.from = 'quynd@tech.est-rouge.com';
  //   letterToUser.subject = 'Congratulations on successfully booking your car!';
  //   letterToUser.html = `
  //                     <p>Dear ${user_name}</p>
  //                     <p>I am writing to inform you that your payment has been successfully processed.</p>
  //                     <p>The payment was received and processed on ${paid_date_time}. All the information regarding this transaction has been carefully verified by our finance team.</p>
  //                     <p>Once again, we would like to express our sincere gratitude for your trust and support. Wishing you a great day and looking forward to serving you in the future.</p>
  //                     <p>Best regards,</p>
  //                     `;
  //   await this.sendgridService.sendEmail(letterToUser);
  // }

  // @Process(EProcessName.cancel_order)
  // async cancelOrder(job: Job) {
  //   let { user_name, cancel_date_time } = job.data;
  //   let letterToUser = new CreateEmailDto();
  //   letterToUser.to = ['nguyenducquy.qt@gmail.com'];
  //   letterToUser.from = 'quynd@tech.est-rouge.com';
  //   letterToUser.subject = 'Congratulations on successfully booking your car!';
  //   letterToUser.html = `
  //                     <p>Dear ${user_name}</p>
  //                     <p>I am writing to inform you that your order has been cancel.</p>
  //                     <p>The payment was received and processed on ${cancel_date_time}. All the information regarding this transaction has been carefully verified by our finance team.</p>
  //                     <p>Once again, we would like to express our sincere gratitude for your trust and support. Wishing you a great day and looking forward to serving you in the future.</p>
  //                     <p>Best regards,</p>
  //                     `;
  //   await this.sendgridService.sendEmail(letterToUser);
  // }
}
