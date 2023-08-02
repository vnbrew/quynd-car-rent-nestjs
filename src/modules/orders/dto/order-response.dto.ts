import { CarResponseDto } from '../../cars/dto/car-response.dto';
import { UserDto } from '../../users/dto/user.dto';
import { OrderStatus } from '../entities/order-status.entity';
import { Order } from '../entities/order.entity';
import { PaymentType } from '../entities/payment-type.entity';
import { Coupon } from '../entities/coupon.entity';

export class OrderResponseDto {
  readonly id: number;
  readonly pick_date_time: Date;
  readonly drop_date_time: Date;
  readonly coupon?: Coupon;
  readonly tax: number;
  readonly total: number;
  readonly subtotal: number;
  readonly discount: number;
  readonly detail?: string;
  readonly payment_type: PaymentType;
  readonly car: CarResponseDto;
  readonly user: UserDto;
  readonly order_status: OrderStatus;

  constructor(order: Order) {
    this.id = order.id;
    this.pick_date_time = order.pick_date_time;
    this.drop_date_time = order.drop_date_time;
    this.coupon = order.coupon;
    this.tax = order.tax;
    this.total = order.total;
    this.subtotal = order.subtotal;
    this.discount = order.discount;
    this.detail = order.detail;
    this.payment_type = order.payment_type;
    this.car = new CarResponseDto(order.car);
    this.user = new UserDto(order.user);
    this.order_status = order.order_status;
  }
}
