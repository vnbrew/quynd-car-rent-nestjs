import {
  COUPON_TYPES_REPOSITORY,
  COUPONS_REPOSITORY,
  ORDER_REPOSITORY,
  ORDER_STATUSES_REPOSITORY,
  ORDER_TYPES_REPOSITORY,
  PAYMENT_TYPES_REPOSITORY,
} from '../../shared/constants';
import { Order } from './entities/order.entity';
import { OrderStatus } from './entities/order-status.entity';
import { OrderType } from './entities/order-type.entity';
import { CouponType } from './entities/coupon-types.entity';
import { Coupon } from './entities/coupon.entity';
import { PaymentType } from './entities/payment-type.entity';

export const ordersProviders = [
  {
    provide: ORDER_STATUSES_REPOSITORY,
    useValue: OrderStatus,
  },
  {
    provide: ORDER_TYPES_REPOSITORY,
    useValue: OrderType,
  },
  {
    provide: ORDER_REPOSITORY,
    useValue: Order,
  },
  {
    provide: COUPON_TYPES_REPOSITORY,
    useValue: CouponType,
  },
  {
    provide: COUPONS_REPOSITORY,
    useValue: Coupon,
  },
  {
    provide: PAYMENT_TYPES_REPOSITORY,
    useValue: PaymentType,
  },
];
