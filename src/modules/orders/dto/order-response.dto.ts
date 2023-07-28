import { CarResponseDto } from '../../cars/dto/car-response.dto';
import { UserDto } from '../../users/dto/user.dto';
import { OrderStatus } from "../entities/order-status.entity";
import { Order } from "../entities/order.entity";
import { PaymentType } from "../entities/payment-type.entity";
import { Coupon } from "../entities/coupon.entity";

export class OrderResponseDto {
  readonly id: number;
  readonly pick_date_time: Date;
  readonly drop_date_time: Date;
  readonly order_date_time: Date;
  readonly paid_date_time: Date;
  readonly cancel_date_time: Date;
  readonly coupon?: Coupon;
  readonly tax: number;
  readonly amount: number;
  readonly detail?: string;
  readonly payment_type: PaymentType;
  readonly car: CarResponseDto;
  readonly user: UserDto;
  readonly order_status: OrderStatus;


  constructor(order: Order) {
    this.id = order.id;
    this.pick_date_time = order.pick_date_time;
    this.drop_date_time = order.drop_date_time;
    this.order_date_time = order.order_date_time;
    this.paid_date_time = order.paid_date_time;
    this.cancel_date_time = order.cancel_date_time;
    this.coupon = order.coupon;
    this.tax = order.tax;
    this.amount = order.amount;
    this.detail = order.detail;
    this.payment_type = order.payment_type;
    this.car = new CarResponseDto(order.car);
    this.user = new UserDto(order.user);
    this.order_status = order.order_status;

  }
}
