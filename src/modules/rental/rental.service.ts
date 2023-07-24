import { Inject, Injectable } from "@nestjs/common";
import { CreateRentalDto } from "./dto/create-rental.dto";
import { UpdateRentalDto } from "./dto/update-rental.dto";
import { RENTAL_STATUSES_REPOSITORY, RENTALS_REPOSITORY, SEQUELIZE } from "../../shared/constants";
import { RentalStatus } from "./entities/rental-status.entity";
import { AppExceptionService } from "../../shared/exception/app.exception.service";
import { I18nContext, I18nService } from "nestjs-i18n";
import { Rental } from "./entities/rental.entity";
import { Sequelize } from "sequelize-typescript";
import { AllRentalResponseDto } from "./dto/all-rental-response.dto";
import { FindOptions, Op } from "sequelize";
import { IDetailExceptionMessage } from "../../shared/exception/app.exception.interface";
import { BadRequestCode, InternalServerErrorCode } from "../../common/enum/exception-code";
import { CarsService } from "../cars/cars.service";
import { RentalResponseDto } from "./dto/rental-response.dto";
import { User } from "../users/entities/user.entity";
import { Car } from "../cars/entities/car.entity";
import { Office } from "../cars/entities/car-office.entity";
import { CarType } from "../cars/entities/car-type.entity";
import { CarSteering } from "../cars/entities/car-steering.entity";
import { CarCapacity } from "../cars/entities/car-capacity.entity";
import { CarStatus } from "../cars/entities/car-status.entity";
import { UserReviewCar } from "../cars/entities/user-review-car.entity";
import { CarImage } from "../cars/entities/car-image.entity";
import { CarPrice } from "../cars/entities/car-price.entity";
import { Payment } from "../payment/entities/payment.entity";
import { Coupon } from "../payment/entities/coupon.entity";
import { CouponType } from "../payment/entities/coupon-types.entity";
import { InjectQueue } from "@nestjs/bull";
import { EProcessName, EQueueName } from "../../common/enum/queue.enum";
import { Queue } from "bull";
import { UsersService } from "../users/users.service";

@Injectable()
export class RentalService {

  constructor(
    @Inject(SEQUELIZE) private readonly sequelize: Sequelize,
    @Inject(RENTAL_STATUSES_REPOSITORY) readonly rentalStatusesRepository: typeof RentalStatus,
    @Inject(RENTALS_REPOSITORY) readonly rentalsRepository: typeof Rental,
    private readonly userService: UsersService,
    private readonly carService: CarsService,
    private readonly appExceptionService: AppExceptionService,
    private readonly i18n: I18nService,
    @InjectQueue(EQueueName.rental) private readonly rentalQueue: Queue
  ) {
  }

  carIsNotAvailable() {
    let message = this.i18n.translate("error.data_type", {
      lang: I18nContext.current().lang
    });
    const code = "";
    const field = "";
    const filed_message = this.i18n.translate("error.car_is_not_available", {
      lang: I18nContext.current().lang
    });
    let detail: IDetailExceptionMessage = { code, field, message: filed_message };
    this.appExceptionService.badRequestException(BadRequestCode.BA_IN_CORRECT_DATA_TYPE, "", message, [detail]);
  }

  private rentalIsInternalError() {
    let message = this.i18n.translate("error.internal_server_error", {
      lang: I18nContext.current().lang
    });
    this.appExceptionService.internalServerErrorException(InternalServerErrorCode.IN_COMMON_ERROR, "", message, []);
  }

  rentalIsNotAvailable() {
    let message = this.i18n.translate("error.data_type", {
      lang: I18nContext.current().lang
    });
    const code = "";
    const field = "";
    const filed_message = this.i18n.translate("error.rental_is_not_available", {
      lang: I18nContext.current().lang
    });
    let detail: IDetailExceptionMessage = { code, field, message: filed_message };
    this.appExceptionService.badRequestException(BadRequestCode.BA_IN_CORRECT_DATA_TYPE, "", message, [detail]);
  }

  async findAllRentalAsAffective(): Promise<Rental[]> {
    let rentals = await this.rentalsRepository.findAll(
      {
        where: { rental_status_id: 1 }
      }
    );
    return rentals;
  }

  private async isCarInRental(carId: number) {
    let carInRentalDB = await this.rentalsRepository.findOne<Rental>({
      where: {
        car_id: carId
      }
    } as FindOptions);
    return !!carInRentalDB;
  }

  private async canBookCar(createRentalDto: CreateRentalDto): Promise<boolean> {
    let carInRental = await this.isCarInRental(createRentalDto.car_id);
    if (!carInRental) return true;
    let carInRentalDB = await this.rentalsRepository.findOne<Rental>({
      where: {
        car_id: createRentalDto.car_id,
        rental_status_id: { [Op.or]: [1, 2, 4] },
        pick_date_time: {
          [Op.and]: {
            [Op.lte]: createRentalDto.drop_date_time,
            [Op.gte]: createRentalDto.pick_date_time
          }
        },
        drop_date_time: {
          [Op.and]: {
            [Op.gte]: createRentalDto.pick_date_time,
            [Op.lte]: createRentalDto.drop_date_time
          }
        }
      }
    } as FindOptions);
    return !carInRentalDB;
  }

  async isUserHasRentalInEffective(userId: number, rentalId: number): Promise<Rental> {
    let userHasRentalInEffective = await this.rentalsRepository.findOne<Rental>(
      {
        where: {
          id: rentalId,
          user_id: userId,
          rental_status_id: 1
        }
      } as FindOptions
    );
    return userHasRentalInEffective;
  }

  async create(userId: number, createRentalDto: CreateRentalDto) {
    // console.log({ userId, ...createRentalDto });
    let isCarAvailable = await this.carService.isCarAvailable(createRentalDto.car_id);
    console.log({ "isCarAvailable": isCarAvailable });
    if (!isCarAvailable) {
      this.carIsNotAvailable();
    }
    let canBookCar = await this.canBookCar(createRentalDto);
    console.log({ "canBookCar": canBookCar });
    if (!canBookCar) {
      this.carIsNotAvailable();
    }
    try {
      await this.sequelize.transaction(async t => {
        let transactionHost = { transaction: t };
        let rental = new Rental();
        rental.user_id = userId;
        rental.car_id = createRentalDto.car_id;
        rental.rental_status_id = createRentalDto.rental_status_id;
        rental.pick_date_time = createRentalDto.pick_date_time;
        rental.drop_date_time = createRentalDto.drop_date_time;
        rental.detail = createRentalDto.detail;
        await rental.save(transactionHost);
        let user = await this.userService.getUserInformation(userId);
        if(user) {
          await this.rentalQueue.add(EProcessName.booking_success,
            {
              "user_name": user.name,
              "pick_date_time": createRentalDto.pick_date_time,
              "drop_date_time": createRentalDto.drop_date_time
            });
        }
      });
    } catch (error) {
      this.rentalIsInternalError();
    }
    return { userId, ...createRentalDto };
  }

  async findAll(userId: number): Promise<AllRentalResponseDto> {
    let rentals = await this.rentalsRepository.findAll<Rental>(
      {
        where: { user_id: userId },
        include: [
          RentalStatus,
          User,
          {
            model: Car,
            include: [
              Office,
              CarType,
              CarSteering,
              CarCapacity,
              CarStatus,
              CarImage,
              CarPrice,
              {
                model: UserReviewCar,
                include: [User],
                required: false
              }
            ]
          },
          {
            model: Payment,
            required: false,
            include: [
              {
                model: Coupon,
                required: false,
                include: [
                  {
                    model: CouponType,
                    required: false
                  }
                ]
              }
            ]
          }
        ]
      }
    );
    return new AllRentalResponseDto(rentals);
  }

  async findOne(id: number, userId: number): Promise<RentalResponseDto> {
    let rentalInDB = await this.rentalsRepository.findOne<Rental>({
      where: {
        id: id,
        user_id: userId
      },
      include: [
        RentalStatus,
        User,
        {
          model: Car,
          include: [
            Office,
            CarType,
            CarSteering,
            CarCapacity,
            CarStatus,
            CarImage,
            CarPrice,
            {
              model: UserReviewCar,
              include: [User],
              required: false
            }
          ]
        },
        {
          model: Payment,
          required: false,
          include: [
            {
              model: Coupon,
              required: false,
              include: [
                {
                  model: CouponType,
                  required: false
                }
              ]
            }
          ]
        }
      ]
    } as FindOptions);
    if (!rentalInDB) {
      this.rentalIsNotAvailable();
    }
    return new RentalResponseDto(rentalInDB);
  }

  async update(id: number, userId: number, updateRentalDto: UpdateRentalDto) {
    let rentalInDB = await this.rentalsRepository.findOne({
      where: {
        id: id,
        user_id: userId
      },
      include: [RentalStatus]
    } as FindOptions);
    if (!rentalInDB) {
      this.rentalIsNotAvailable();
    }
    try {
      await rentalInDB.update(
        {
          rental_status_id: updateRentalDto.rental_status_id
        }
        // { where: { id: id } }
      );
    } catch (error) {
      this.rentalIsInternalError();
    }
    return { rentalInDB };
  }

  remove(id: number) {
    return `This action removes a #${id} rental`;
  }
}
