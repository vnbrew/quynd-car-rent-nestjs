import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { EQueueName } from "../../shared/enum/queue.enum";
import { RentalProcessor } from "./rental.processor";
import { SendgridModule } from "../sendgrid/sendgrid.module";
import { RegisterProcessor } from "./register.processor";
import { PaymentProcessor } from "./payment.processor";

@Module({
  imports: [
    SendgridModule,
    BullModule.forRoot({
      redis: {
        host: "localhost",
        port: 6379
      }
    }),
    BullModule.registerQueue({ name: EQueueName.register }),
    BullModule.registerQueue({ name: EQueueName.rental }),
    BullModule.registerQueue({ name: EQueueName.payment })
  ],
  controllers: [],
  providers: [RentalProcessor, RegisterProcessor, PaymentProcessor],
  exports: [
    BullModule
  ]
})
export class QueueModule {
}
