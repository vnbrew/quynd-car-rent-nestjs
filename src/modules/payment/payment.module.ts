import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { paymentsProviders } from "./payment.provider";
import { RentalModule } from "../rental/rental.module";
import { AppExceptionModule } from "../../core/exception/app.exception.module";
import { databaseProvider } from "../../core/database/database.provider";
import { CarsModule } from "../cars/cars.module";
import { CouponController } from "./coupon.controller";
import { CouponService } from "./coupon.service";
import { QueueModule } from "../queue/queue.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [AppExceptionModule, RentalModule, CarsModule, QueueModule, UsersModule],
  controllers: [PaymentController, CouponController],
  providers: [PaymentService, CouponService, ...paymentsProviders, ...databaseProvider]
})
export class PaymentModule {
}
