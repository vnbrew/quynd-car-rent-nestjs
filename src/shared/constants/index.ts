import { User } from '../../modules/users/entities/user.entity';
import { UserToken } from '../../modules/users/entities/user-token.entity';
import { SetMetadata } from '@nestjs/common';
import { Role } from '../../common/enum/role';
import { Car } from '../../modules/cars/entities/car.entity';
import { CarType } from '../../modules/cars/entities/car-type.entity';
import { CarCapacity } from '../../modules/cars/entities/car-capacity.entity';
import { CarSteering } from '../../modules/cars/entities/car-steering.entity';
import { CarStatus } from '../../modules/cars/entities/car-status.entity';
import { CarImage } from '../../modules/cars/entities/car-image.entity';
import { UserFavoriteCar } from '../../modules/cars/entities/user-favorite-car.entity';
import { UserReviewCar } from '../../modules/cars/entities/user-review-car.entity';
import { RentalStatus } from '../../modules/rental/entities/rental-status.entity';
import { Rental } from '../../modules/rental/entities/rental.entity';
import { PaymentStatus } from '../../modules/payment/entities/payment-status.entity';
import { Payment } from '../../modules/payment/entities/payment.entity';
import { Coupon } from '../../modules/orders/entities/coupon.entity';
import { CouponType } from '../../modules/orders/entities/coupon-types.entity';
import { PaymentType } from '../../modules/orders/entities/payment-type.entity';
import { OrderType } from '../../modules/orders/entities/order-type.entity';
import { OrderStatus } from '../../modules/orders/entities/order-status.entity';
import { Order } from '../../modules/orders/entities/order.entity';
import { City } from "../../modules/cars/entities/city.entity";
import { PickCarCity } from "../../modules/cars/entities/pick-car-city.entity";
import { DropCarCity } from "../../modules/cars/entities/drop-car-city.entity";

export const SEQUELIZE = 'SEQUELIZE';
export const DEVELOPMENT = 'development';
export const STAGING = 'staging';
export const PRODUCTION = 'production';

export const USERS_REPOSITORY = 'USERS_REPOSITORY';
export const USER_TOKENS_REPOSITORY = 'USER_TOKENS_REPOSITORY';

export const CAR_TYPES_REPOSITORY = 'CAR_TYPES_REPOSITORY';
export const CAR_CAPACITIES_REPOSITORY = 'CAR_CAPACITIES_REPOSITORY';
export const CAR_STEERINGS_REPOSITORY = 'CAR_STEERINGS_REPOSITORY';
export const CAR_STATUSES_REPOSITORY = 'CAR_STATUSES_REPOSITORY';
export const CAR_IMAGES_REPOSITORY = 'CAR_IMAGES_REPOSITORY';
export const USER_FAVORITE_CAR_REPOSITORY = 'USER_FAVORITE_CAR_REPOSITORY';
export const USER_REVIEWS_CAR_REPOSITORY = 'USER_REVIEWS_CAR_REPOSITORY';
export const CARS_REPOSITORY = 'CARS_REPOSITORY';

export const ORDER_STATUSES_REPOSITORY = 'ORDER_STATUSES_REPOSITORY';
export const ORDER_TYPES_REPOSITORY = 'ORDER_TYPES_REPOSITORY';
export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

export const RENTAL_STATUSES_REPOSITORY = 'RENTAL_STATUSES_REPOSITORY';
export const RENTALS_REPOSITORY = 'RENTALS_REPOSITORY';

export const PAYMENT_STATUSES_REPOSITORY = 'PAYMENT_STATUSES_REPOSITORY';
export const PAYMENT_TYPES_REPOSITORY = 'PAYMENT_TYPES_REPOSITORY';
export const PAYMENTS_REPOSITORY = 'PAYMENTS_REPOSITORY';

export const COUPON_TYPES_REPOSITORY = 'COUPON_TYPES_REPOSITORY';
export const COUPONS_REPOSITORY = 'COUPONS_REPOSITORY';

export const SEQUELIZE_MODELS = [
  User,
  UserToken,
  CarType,
  CarCapacity,
  CarSteering,
  CarStatus,
  UserFavoriteCar,
  CarImage,
  UserReviewCar,
  Car,
  OrderType,
  OrderStatus,
  Order,
  RentalStatus,
  Rental,
  PaymentStatus,
  PaymentType,
  Payment,
  CouponType,
  Coupon,
  City,
  PickCarCity,
  DropCarCity
];

export const IS_PUBLIC_KEY = 'isPublic';
export const SetPublic = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLES_KEY = 'roles';
export const SetRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
