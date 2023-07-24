import { Inject, Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import {
  COUPON_TYPES_REPOSITORY, COUPONS_REPOSITORY,
  PAYMENT_STATUSES_REPOSITORY, PAYMENT_TYPES_REPOSITORY, PAYMENTS_REPOSITORY,
  SEQUELIZE
} from "../../shared/constants";
import { Sequelize } from "sequelize-typescript";
import { AppExceptionService } from "../../shared/exception/app.exception.service";
import { I18nContext, I18nService } from "nestjs-i18n";
import { PaymentStatus } from "./entities/payment-status.entity";
import { Payment } from "./entities/payment.entity";
import { RentalService } from "../rental/rental.service";
import { InternalServerErrorCode } from "../../common/enum/exception-code";
import { CouponType } from "./entities/coupon-types.entity";
import { Coupon } from "./entities/coupon.entity";
import { FindOptions, Op } from "sequelize";
import { PaymentType } from "./entities/payment-type.entity";
import { CarsService } from "../cars/cars.service";
import { CreateCouponDto } from "./dto/create-coupon.dto";

@Injectable()
export class CouponService {

  constructor(
    @Inject(COUPON_TYPES_REPOSITORY) readonly couponTypesRepository: typeof CouponType,
    @Inject(COUPONS_REPOSITORY) readonly couponsRepository: typeof Coupon,
    private readonly appExceptionService: AppExceptionService,
    private readonly i18n: I18nService
  ) {
  }

  private rentalIsInternalError(error) {
    let message = this.i18n.translate("error.internal_server_error", {
      lang: I18nContext.current().lang
    });
    this.appExceptionService.internalServerErrorException(InternalServerErrorCode.IN_COMMON_ERROR, "", message, [error]);
  }

  async create(createCouponDto: CreateCouponDto) {
    try {
      let coupon = new Coupon();
      coupon.coupon_type_id = createCouponDto.coupon_type_id;
      coupon.code = createCouponDto.code;
      coupon.value = createCouponDto.value;
      coupon.expiration_time = createCouponDto.expiration_time;
      await coupon.save();
    } catch (error) {
      this.rentalIsInternalError(error);
    }
    return {  };
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
