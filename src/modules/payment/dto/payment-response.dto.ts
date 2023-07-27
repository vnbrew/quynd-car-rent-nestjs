import { Payment } from '../entities/payment.entity';
import { Coupon } from '../../orders/entities/coupon.entity';
import { CouponResponseDto } from './coupon-response.dto';

export class PaymentResponseDto {
  readonly id: number;
  readonly tax: number;
  readonly pay_date_time: Date;
  readonly amount: number;
  readonly coupon: CouponResponseDto | {};

  constructor(payment: Payment) {
    this.id = payment.id;
    this.tax = payment.tax;
    this.pay_date_time = payment.pay_date_time;
    this.amount = payment.amount;
    this.coupon = payment.coupon ? new CouponResponseDto(payment.coupon) : {};
  }
}
