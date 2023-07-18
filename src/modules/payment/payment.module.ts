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

@Module({
  imports: [AppExceptionModule, RentalModule, CarsModule],
  controllers: [PaymentController, CouponController],
  providers: [PaymentService, CouponService, ...paymentsProviders, ...databaseProvider]
})
export class PaymentModule {
}
