import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import {
  COUPON_TYPES_REPOSITORY,
  COUPONS_REPOSITORY,
  PAYMENT_STATUSES_REPOSITORY,
  PAYMENT_TYPES_REPOSITORY,
  PAYMENTS_REPOSITORY,
  SEQUELIZE,
} from '../../shared/constants';
import { Sequelize } from 'sequelize-typescript';
import { AppExceptionService } from '../../shared/exception/app.exception.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { PaymentStatus } from './entities/payment-status.entity';
import { Payment } from './entities/payment.entity';
import { RentalService } from '../rental/rental.service';
import { InternalServerErrorCode } from '../../common/enum/exception-code';
import { CouponType } from '../orders/entities/coupon-types.entity';
import { Coupon } from '../orders/entities/coupon.entity';
import { FindOptions, Op } from 'sequelize';
import { PaymentType } from '../orders/entities/payment-type.entity';
import { CarsService } from '../cars/cars.service';
import { InjectQueue } from '@nestjs/bull';
import { EProcessName, EQueueName } from '../../common/enum/queue.enum';
import { Queue } from 'bull';
import { UsersService } from '../users/users.service';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(SEQUELIZE) private readonly sequelize: Sequelize,
    @Inject(PAYMENT_STATUSES_REPOSITORY)
    readonly paymentStatusesRepository: typeof PaymentStatus,
    @Inject(PAYMENT_TYPES_REPOSITORY)
    readonly paymentTypesRepository: typeof PaymentType,
    @Inject(PAYMENTS_REPOSITORY) readonly paymentsRepository: typeof Payment,
    @Inject(COUPON_TYPES_REPOSITORY)
    readonly couponTypesRepository: typeof CouponType,
    @Inject(COUPONS_REPOSITORY) readonly couponsRepository: typeof Coupon,
    @InjectQueue(EQueueName.payment) private readonly paymentQueue: Queue,
    private readonly rentalService: RentalService,
    private readonly carsService: CarsService,
    private readonly userService: UsersService,
    private readonly appExceptionService: AppExceptionService,
    private readonly i18n: I18nService,
  ) {}

  private rentalIsInternalError(error) {
    let message = this.i18n.translate('error.internal_server_error', {
      lang: I18nContext.current().lang,
    });
    this.appExceptionService.internalServerErrorException(
      InternalServerErrorCode.IN_COMMON_ERROR,
      '',
      message,
      [error],
    );
  }

  async create(userId: number, createPaymentDto: CreatePaymentDto) {
    let userHasRentalInEffective =
      await this.rentalService.isUserHasRentalInEffective(
        userId,
        createPaymentDto.rental_id,
      );
    if (userHasRentalInEffective) {
      let carInDB = await this.carsService.findCarById(
        userHasRentalInEffective.car_id,
      );
      let currentDate = new Date();
      if (carInDB) {
        try {
          await this.sequelize.transaction(async (t) => {
            let transactionHost = { transaction: t };
            let payment = new Payment();
            payment.rental_id = createPaymentDto.rental_id;
            payment.payment_type_id = createPaymentDto.payment_type_id;
            payment.payment_status_id = createPaymentDto.payment_status_id;
            payment.tax = createPaymentDto.tax;
            payment.pay_date_time = currentDate;
            let couponCode = createPaymentDto.coupon_code
              ? createPaymentDto.coupon_code
              : '';
            let couponInDB = await this.couponsRepository.findOne<Coupon>({
              where: {
                code: couponCode,
                expiration_time: { [Op.gte]: currentDate },
              },
              include: [CouponType],
            } as FindOptions);
            let discount: number = 0;
            if (couponInDB) {
              payment.coupon_id = couponInDB.id;
              switch (couponInDB.coupon_type_id) {
                case 1:
                  discount = couponInDB.value;
                  break;
                case 2:
                  discount =
                    (carInDB.carPrice.rental_price * couponInDB.value) / 100;
                  // console.log({ "1": carInDB.carPrice.rental_price, "2": couponInDB.value, "3": discount });
                  break;
                default:
                  discount = 0;
                  break;
              }
            }
            let amount = carInDB.carPrice.rental_price - discount;
            let totalAmount = amount + (amount * createPaymentDto.tax) / 100;
            payment.amount = totalAmount;
            // console.log(amount);
            // console.log(totalAmount);
            let newRental = await userHasRentalInEffective.update(
              { rental_status_id: 2 },
              transactionHost,
            );
            await payment.save(transactionHost);
            let user = await this.userService.getUserInformation(userId);
            if (user) {
              await this.paymentQueue.add(EProcessName.payment_completed, {
                user_name: user.name,
                pay_date_time: currentDate,
              });
            }
          });
        } catch (error) {
          this.rentalIsInternalError(error);
        }
      } else {
        this.rentalService.carIsNotAvailable();
      }
    } else {
      this.rentalService.rentalIsNotAvailable();
    }
    return {};
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
