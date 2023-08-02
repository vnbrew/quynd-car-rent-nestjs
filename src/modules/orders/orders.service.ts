import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  COUPONS_REPOSITORY,
  ORDER_REPOSITORY,
  SEQUELIZE,
} from '../../shared/constants';
import { Sequelize } from 'sequelize-typescript';
import { UsersService } from '../users/users.service';
import { CarsService } from '../cars/cars.service';
import { AppExceptionService } from '../../shared/exception/app.exception.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { InjectQueue } from '@nestjs/bull';
import { EProcessName, EQueueName } from '../../common/enum/queue.enum';
import { Queue } from 'bull';
import { Order } from './entities/order.entity';
import { IDetailExceptionMessage } from '../../shared/exception/app.exception.interface';
import {
  BadRequestCode,
  InternalServerErrorCode,
} from '../../common/enum/exception-code';
import { FindOptions, Op, or } from 'sequelize';
import { EOrderErrorType, EOrderStatus } from '../../common/enum/order.enum';
import { Coupon } from './entities/coupon.entity';
import { CouponType } from './entities/coupon-types.entity';
import { OrderResponseDto } from './dto/order-response.dto';
import { User } from '../users/entities/user.entity';
import { Car } from '../cars/entities/car.entity';
import { PaymentType } from './entities/payment-type.entity';
import { calculateNumberOfRentDays } from '../../common/utils/ultils';
import { OrderStatusHistory } from './entities/order-status-history.entity';
import { CarType } from '../cars/entities/car-type.entity';
import { CarSteering } from '../cars/entities/car-steering.entity';
import { CarCapacity } from '../cars/entities/car-capacity.entity';
import { CarStatus } from '../cars/entities/car-status.entity';
import { UserReviewCar } from '../cars/entities/user-review-car.entity';
import { ECarStatus } from '../../common/enum/car.enum';
import { CarImage } from '../cars/entities/car-image.entity';
import { PickCarCity } from '../cars/entities/pick-car-city.entity';
import { City } from '../cars/entities/city.entity';
import { DropCarCity } from '../cars/entities/drop-car-city.entity';
import { OrderStatus } from './entities/order-status.entity';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(SEQUELIZE) private readonly sequelize: Sequelize,
    @Inject(ORDER_REPOSITORY) readonly ordersRepository: typeof Order,
    private readonly userService: UsersService,
    private readonly carService: CarsService,
    private readonly appExceptionService: AppExceptionService,
    private readonly i18n: I18nService,
    @InjectQueue(EQueueName.order) private readonly orderQueue: Queue,
    @Inject(COUPONS_REPOSITORY) readonly couponsRepository: typeof Coupon,
  ) {}

  private couponIsInValid() {
    let message = this.i18n.translate('error.data_type', {
      lang: I18nContext.current().lang,
    });
    const code = '';
    const field = '';
    const filed_message = this.i18n.translate('error.coupon_is_not_available', {
      lang: I18nContext.current().lang,
    });
    let detail: IDetailExceptionMessage = {
      code,
      field,
      message: filed_message,
    };
    this.appExceptionService.badRequestException(
      BadRequestCode.BA_COUPON_DOES_NOT_EXIST,
      '',
      message,
      [detail],
    );
  }

  private carIsNotAvailable() {
    let message = this.i18n.translate('error.data_type', {
      lang: I18nContext.current().lang,
    });
    const code = '';
    const field = '';
    const filed_message = this.i18n.translate('error.car_is_not_available', {
      lang: I18nContext.current().lang,
    });
    let detail: IDetailExceptionMessage = {
      code,
      field,
      message: filed_message,
    };
    this.appExceptionService.badRequestException(
      BadRequestCode.BA_IN_CORRECT_DATA_TYPE,
      '',
      message,
      [detail],
    );
  }

  private orderIsNotAvailable() {
    let message = this.i18n.translate('error.data_type', {
      lang: I18nContext.current().lang,
    });
    const code = '';
    const field = '';
    const filed_message = this.i18n.translate('error.order_is_not_available', {
      lang: I18nContext.current().lang,
    });
    let detail: IDetailExceptionMessage = {
      code,
      field,
      message: filed_message,
    };
    this.appExceptionService.badRequestException(
      BadRequestCode.BA_IN_CORRECT_DATA_TYPE,
      '',
      message,
      [detail],
    );
  }

  private orderIsInternalError() {
    let message = this.i18n.translate('error.internal_server_error', {
      lang: I18nContext.current().lang,
    });
    this.appExceptionService.internalServerErrorException(
      InternalServerErrorCode.IN_COMMON_ERROR,
      '',
      message,
      [],
    );
  }

  private async isCarInOrder(carId: number) {
    let carInRentalDB = await this.ordersRepository.findOne<Order>({
      where: {
        car_id: carId,
      },
    } as FindOptions);
    return !!carInRentalDB;
  }

  private async canOrderCar(
    createOrderDto: CreateOrderDto,
    transactionHost,
  ): Promise<boolean> {
    let carInRental = await this.isCarInOrder(createOrderDto.car_id);
    if (!carInRental) return true;
    let carInRentalDB = await this.ordersRepository.findOne<Order>({
      where: {
        car_id: createOrderDto.car_id,
        order_status_id: { [Op.or]: [EOrderStatus.order, EOrderStatus.paid] },
        [Op.or]: [
          {
            pick_date_time: { [Op.lte]: createOrderDto.pick_date_time },
            drop_date_time: { [Op.gte]: createOrderDto.drop_date_time },
          },
          {
            pick_date_time: {
              [Op.and]: {
                [Op.lte]: createOrderDto.drop_date_time,
                [Op.gte]: createOrderDto.pick_date_time,
              },
            },
          },
          {
            drop_date_time: {
              [Op.and]: {
                [Op.gte]: createOrderDto.pick_date_time,
                [Op.lte]: createOrderDto.drop_date_time,
              },
            },
          },
        ],
      },
      transactionHost,
    } as FindOptions);
    return !carInRentalDB;
  }

  async createOrder(userId: number, createOrderDto: CreateOrderDto) {
    try {
      await this.sequelize.transaction(async (t) => {
        let transactionHost = { transaction: t };
        // await this.sequelize.query(`SELECT * FROM cars WHERE id = ${createOrderDto.car_id} FOR UPDATE`, transactionHost);
        // await this.sequelize.query(`UPDATE cars SET locked = true WHERE id = ${createOrderDto.car_id}`, transactionHost);
        let carInDB = await this.carService.isCarAvailableAndCanPickDropAt(
          createOrderDto.car_id,
          createOrderDto.pick_city,
          createOrderDto.drop_city,
          t,
        );
        if (!carInDB) {
          throw { type: EOrderErrorType.ORDER_CAR_IS_NOT_AVAILABLE };
        }

        let canBookCar = await this.canOrderCar(
          createOrderDto,
          transactionHost,
        );
        if (!canBookCar) {
          throw { type: EOrderErrorType.ORDER_CAR_IS_NOT_AVAILABLE };
        }

        let currentDate = new Date();
        let couponCode = createOrderDto.coupon_code
          ? createOrderDto.coupon_code
          : '';
        let couponInDB = await this.couponsRepository.findOne<Coupon>({
          where: {
            code: couponCode,
            expiration_time: { [Op.gte]: currentDate },
          },
          transactionHost,
          include: [CouponType],
        } as FindOptions);
        if (createOrderDto.coupon_code !== '' && !couponInDB) {
          throw { type: EOrderErrorType.ORDER_COUPON_IS_INVALID };
        }
        if (createOrderDto.order_status_id !== EOrderStatus.order) {
          throw { type: EOrderErrorType.ORDER_IS_INTERNAL_ERROR };
        }
        let numberOfDays = calculateNumberOfRentDays(
          createOrderDto.pick_date_time.toString(),
          createOrderDto.drop_date_time.toString(),
        );

        let order = new Order();
        order.user_id = userId;
        order.car_id = createOrderDto.car_id;
        order.order_status_id = createOrderDto.order_status_id;
        order.payment_type_id = createOrderDto.payment_type_id;
        order.pick_date_time = createOrderDto.pick_date_time;
        order.drop_date_time = createOrderDto.drop_date_time;
        order.billing_id = createOrderDto.billing_id;
        order.tax = createOrderDto.tax;
        order.detail = createOrderDto.detail;
        let totalPriceWithNumberOfDays = numberOfDays * carInDB.rental_price;
        let discount: number = 0;
        if (couponInDB) {
          order.coupon_id = couponInDB.id;
          switch (couponInDB.coupon_type_id) {
            case 1:
              discount = couponInDB.value;
              break;
            case 2:
              discount = (totalPriceWithNumberOfDays * couponInDB.value) / 100;
              // console.log({ "1": carInDB.carPrice.rental_price, "2": couponInDB.value, "3": discount });
              break;
            default:
              discount = 0;
              break;
          }
        }
        let totalPriceWithNumberOfDaysAfterDiscount =
          totalPriceWithNumberOfDays - discount;
        let tax_price =
          (totalPriceWithNumberOfDaysAfterDiscount * createOrderDto.tax) / 100;

        order.discount = discount;
        order.tax_price = tax_price;
        order.subtotal = totalPriceWithNumberOfDays;
        order.total = totalPriceWithNumberOfDaysAfterDiscount + tax_price;
        let newOrder = await order.save(transactionHost);

        let orderStatusHistory = new OrderStatusHistory();
        orderStatusHistory.order_id = newOrder.id;
        orderStatusHistory.order_status_id = createOrderDto.order_status_id;
        await orderStatusHistory.save(transactionHost);

        let user = await this.userService.getUserInformation(userId);
        if (user) {
          await this.orderQueue.add(EProcessName.create_order, {
            user_name: user.name,
            pick_date_time: createOrderDto.pick_date_time,
            drop_date_time: createOrderDto.drop_date_time,
          });
        }
        // await this.sequelize.query(`UPDATE cars SET locked = false WHERE id = ${createOrderDto.car_id}`, transactionHost);
      });
    } catch (error) {
      switch (error.type) {
        case EOrderErrorType.ORDER_CAR_IS_NOT_AVAILABLE:
          this.carIsNotAvailable();
          break;
        case EOrderErrorType.ORDER_COUPON_IS_INVALID:
          this.couponIsInValid();
          break;
        default:
          this.orderIsInternalError();
      }
    }
    return {};
  }

  async completeOrder(
    userId: number,
    orderId: number,
    updateOrderDto: UpdateOrderDto,
  ) {
    let orderOfUser = await this.ordersRepository.findOne({
      where: {
        id: orderId,
        user_id: userId,
        order_status_id: EOrderStatus.order,
      },
    } as FindOptions);

    if (!orderOfUser) {
      this.orderIsNotAvailable();
    }
    let order_status_id = EOrderStatus.order;
    //Pay Order
    if (updateOrderDto.order_status_id === EOrderStatus.paid) {
      order_status_id = EOrderStatus.paid;
    }
    //Cancel Order
    else if (updateOrderDto.order_status_id === EOrderStatus.cancel) {
      order_status_id = EOrderStatus.cancel;
    }
    try {
      let currentDate = new Date();
      await this.sequelize.transaction(async (t) => {
        let transactionHost = { transaction: t };
        await orderOfUser.update(
          {
            order_status_id: order_status_id,
            detail: updateOrderDto.detail
              ? updateOrderDto.detail
              : orderOfUser.detail,
          },
          transactionHost,
        );

        let orderStatusHistory = new OrderStatusHistory();
        orderStatusHistory.order_id = orderOfUser.id;
        orderStatusHistory.order_status_id = order_status_id;
        await orderStatusHistory.save(transactionHost);

        // let user = await this.userService.getUserInformation(userId);
        // if (user) {
        //   if (order_status_id === EOrderStatus.paid) {
        //     await this.orderQueue.add(EProcessName.pay_order, {
        //       user_name: user.name,
        //       paid_date_time: currentDate
        //     });
        //   }
        //   if (order_status_id === EOrderStatus.cancel) {
        //     await this.orderQueue.add(EProcessName.cancel_order, {
        //       user_name: user.name,
        //       cancel_date_time: currentDate
        //     });
        //   }
        // }
      });
    } catch (error) {
      this.orderIsInternalError();
    }
  }

  async findOne(userId: number, id: number): Promise<OrderResponseDto> {
    let orderOfUser = await this.ordersRepository.findOne<Order>({
      where: {
        id: id,
        user_id: userId,
      },
      include: [
        User,
        {
          model: Car,
          include: [
            {
              model: CarType,
            },
            {
              model: CarCapacity,
            },
            {
              model: CarStatus,
              where: { status: ECarStatus.available },
            },
            {
              model: CarSteering,
            },
            {
              model: CarImage,
              required: false,
            },
            {
              model: UserReviewCar,
              include: [User],
              required: false,
            },
            {
              model: PickCarCity,
              include: [City],
              required: false,
            },
            {
              model: DropCarCity,
              include: [City],
              required: false,
            },
          ],
        },
        {
          model: Coupon,
          required: false,
          include: [CouponType],
        },
        {
          model: PaymentType,
        },
        {
          model: OrderStatus,
        },
      ],
    } as FindOptions);
    if (!orderOfUser) {
      this.orderIsNotAvailable();
    }
    return new OrderResponseDto(orderOfUser);
  }
}
