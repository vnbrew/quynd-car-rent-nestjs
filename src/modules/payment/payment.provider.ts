import {
  COUPON_TYPES_REPOSITORY, COUPONS_REPOSITORY,
  PAYMENT_STATUSES_REPOSITORY, PAYMENT_TYPES_REPOSITORY, PAYMENTS_REPOSITORY
} from "../../core/constants";
import { Payment } from "./entities/payment.entity";
import { PaymentStatus } from "./entities/payment-status.entity";
import { CouponType } from "./entities/coupon-types.entity";
import { Coupon } from "./entities/coupon.entity";
import { PaymentType } from "./entities/payment-type.entity";

export const paymentsProviders = [
  {
    provide: PAYMENT_STATUSES_REPOSITORY,
    useValue: PaymentStatus
  },
  {
    provide: PAYMENT_TYPES_REPOSITORY,
    useValue: PaymentType
  },
  {
    provide: PAYMENTS_REPOSITORY,
    useValue: Payment
  },
  {
    provide: COUPON_TYPES_REPOSITORY,
    useValue: CouponType
  },
  {
    provide: COUPONS_REPOSITORY,
    useValue: Coupon
  }
];