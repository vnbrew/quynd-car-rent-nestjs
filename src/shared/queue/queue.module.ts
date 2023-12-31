import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EQueueName } from '../../common/enum/queue.enum';
import { RentalProcessor } from './rental.processor';
import { EmailModule } from '../email/email.module';
import { RegisterProcessor } from './register.processor';
import { PaymentProcessor } from './payment.processor';
import { OrderProcessor } from './order.processor';

@Module({
  imports: [
    EmailModule,
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({ name: EQueueName.register }),
    BullModule.registerQueue({ name: EQueueName.rental }),
    BullModule.registerQueue({ name: EQueueName.payment }),
    BullModule.registerQueue({ name: EQueueName.order }),
  ],
  controllers: [],
  providers: [
    RentalProcessor,
    RegisterProcessor,
    PaymentProcessor,
    OrderProcessor,
  ],
  exports: [BullModule],
})
export class QueueModule {}
