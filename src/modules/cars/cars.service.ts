import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CreateCarResponseDto } from './dto/create-car-response.dto';
import {
  CAR_CAPACITIES_REPOSITORY,
  CAR_IMAGES_REPOSITORY,
  CAR_PRICES_REPOSITORY,
  CAR_STATUSES_REPOSITORY,
  CAR_STEERINGS_REPOSITORY,
  CAR_TYPES_REPOSITORY,
  CARS_REPOSITORY,
  OFFICES_REPOSITORY,
  SEQUELIZE,
  USER_FAVORITE_CAR_REPOSITORY,
  USER_REVIEWS_CAR_REPOSITORY,
} from '../../shared/constants';
import sequelize, { DestroyOptions, FindOptions, Op } from 'sequelize';
import { UpdateOptions } from 'sequelize/types/model';
import { Car } from './entities/car.entity';
import { AppExceptionService } from '../../shared/exception/app.exception.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { IDetailExceptionMessage } from '../../shared/exception/app.exception.interface';
import {
  BadRequestCode,
  InternalServerErrorCode,
} from '../../common/enum/exception-code';
import { UpdateCarResponseDto } from './dto/update-car-response.dto';
import { CarResponseDto } from './dto/car-response.dto';
import { CarType } from './entities/car-type.entity';
import { Office } from './entities/car-office.entity';
import { CarCapacity } from './entities/car-capacity.entity';
import { CarStatus } from './entities/car-status.entity';
import { CarSteering } from './entities/car-steering.entity';
import { CarPrice } from './entities/car-price.entity';
import { Sequelize } from 'sequelize-typescript';
import { Inject, Injectable } from '@nestjs/common';
import { ECarPrice, ECarStatus } from '../../common/enum/car.enum';
import {
  isDateValid,
  isPriceValid,
  isSameDateTime,
} from '../../common/utils/ultils';
import { CarImage } from './entities/car-image.entity';
import { CreateUserFavoriteCarResponseDto } from './dto/create-user-favorite-car-response.dto';
import { UserFavoriteCar } from './entities/user-favorite-car.entity';
import { CreateUserFavoriteCarDto } from './dto/create-user-favorite-car.dto';
import { CreateUserReviewCarDto } from './dto/create-user-review-car.dto';
import { CreateUserReviewCarResponseDto } from './dto/create-user-review-car-response.dto';
import { UserReviewCar } from './entities/user-review-car.entity';
import { UpdateUserReviewCarDto } from './dto/update-user-review-car.dto';
import { UpdateUserReviewCarResponseDto } from './dto/update-user-review-car-response.dto';
import { UserFavoriteCarResponseDto } from './dto/user-favorite-car-response.dto';
import { User } from '../users/entities/user.entity';
import { UserFavoriteCarsResponseDto } from './dto/user-favorite-cars-response.dto';
import { AllCarResponseDto } from './dto/all-car-response.dto';
import { PagingCarDto } from './dto/paging-car.dto';
import { Rental } from '../rental/entities/rental.entity';
import { Order } from '../orders/entities/order.entity';

@Injectable()
export class CarsService {
  constructor(
    @Inject(SEQUELIZE) private readonly sequelize: Sequelize,
    @Inject(CARS_REPOSITORY) private readonly carsRepository: typeof Car,
    @Inject(OFFICES_REPOSITORY)
    private readonly officesRepository: typeof Office,
    @Inject(CAR_TYPES_REPOSITORY)
    private readonly carTypesRepository: typeof CarType,
    @Inject(CAR_CAPACITIES_REPOSITORY)
    private readonly carCapacitiesRepository: typeof CarCapacity,
    @Inject(CAR_STEERINGS_REPOSITORY)
    private readonly carSteeringRepository: typeof CarSteering,
    @Inject(CAR_STATUSES_REPOSITORY)
    private readonly carStatuesRepository: typeof CarStatus,
    @Inject(CAR_PRICES_REPOSITORY)
    private readonly carPricesRepository: typeof CarPrice,
    @Inject(CAR_IMAGES_REPOSITORY)
    private readonly carImagesRepository: typeof CarImage,
    @Inject(USER_FAVORITE_CAR_REPOSITORY)
    private readonly userFavoriteCarRepository: typeof UserFavoriteCar,
    @Inject(USER_REVIEWS_CAR_REPOSITORY)
    private readonly userReviewCarRepository: typeof UserReviewCar,
    private readonly appExceptionService: AppExceptionService,
    private readonly i18n: I18nService,
  ) {}

  async isCarAvailable(carId: number): Promise<boolean> {
    let isCarAvailable = await this.carsRepository.findOne<Car>({
      where: {
        id: carId,
      },
      include: [
        {
          model: CarStatus,
          where: {
            status: ECarStatus.available,
          },
        },
      ],
    } as FindOptions);
    return !!isCarAvailable;
  }

  async create(createCarDto: CreateCarDto): Promise<CreateCarResponseDto> {
    let carStatusInDB = await this.carStatuesRepository.findOne({
      where: { id: createCarDto.car_status_id },
    } as FindOptions);
    if (carStatusInDB && carStatusInDB.status === ECarStatus.available) {
      let fromDateTimeValid = isDateValid(createCarDto.from_date_time);
      if (!fromDateTimeValid) {
        let message = this.i18n.translate('error.data_type', {
          lang: I18nContext.current().lang,
        });
        const code = '';
        const field = 'from_date_time';
        const filed_message = this.i18n.translate(
          'error.incorrect_datetime_value',
          {
            lang: I18nContext.current().lang,
          },
        );
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
      let originalPriceValid = isPriceValid(createCarDto.original_price);
      if (!originalPriceValid) {
        let message = this.i18n.translate('error.data_type', {
          lang: I18nContext.current().lang,
        });
        const code = '';
        const field = 'original_price';
        const filed_message = this.i18n.translate(
          'error.incorrect_decimal_value',
          {
            lang: I18nContext.current().lang,
          },
        );
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
      let rentalPriceValid = isPriceValid(createCarDto.rental_price);
      if (!rentalPriceValid) {
        let message = this.i18n.translate('error.data_type', {
          lang: I18nContext.current().lang,
        });
        const code = '';
        const field = 'rental_price';
        const filed_message = this.i18n.translate(
          'error.incorrect_decimal_value',
          {
            lang: I18nContext.current().lang,
          },
        );
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
    }
    try {
      await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };
        let car = new Car();
        car.office_id = createCarDto.office_id;
        car.car_type_id = createCarDto.car_type_id;
        car.car_capacity_id = createCarDto.car_capacity_id;
        car.car_steering_id = createCarDto.car_steering_id;
        car.car_status_id = createCarDto.car_status_id;
        car.name = createCarDto.name;
        car.gasoline = createCarDto.gasoline;
        car.description = createCarDto.description;
        let newCar = await car.save(transactionHost);

        let carPrice = new CarPrice();
        carPrice.car_id = newCar.id;
        carPrice.original_price = createCarDto.original_price;
        carPrice.rental_price = createCarDto.rental_price;
        carPrice.from_date_time = createCarDto.from_date_time;
        carPrice.to_date_time = createCarDto.to_date_time;
        await carPrice.save(transactionHost);

        let imageLength = createCarDto.images.length;
        for (
          let i = 0;
          i < (imageLength === 0 || imageLength < 4 ? 4 : imageLength);
          i++
        ) {
          let carImage = new CarImage();
          carImage.car_id = newCar.id;
          if (imageLength !== 0) carImage.image_url = createCarDto.images[i];
          await carImage.save(transactionHost);
        }
      });
      return new CreateCarResponseDto();
    } catch (error) {
      if (
        [
          'ER_TRUNCATED_WRONG_VALUE',
          'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD',
        ].includes(error.original.code)
      ) {
        let message = this.i18n.translate('error.data_type', {
          lang: I18nContext.current().lang,
        });
        const code = '';
        const field = '';
        const filed_message = error.message;
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
      if (['ER_NO_REFERENCED_ROW_2'].includes(error.original.code)) {
        let message = this.i18n.translate('error.data_type', {
          lang: I18nContext.current().lang,
        });
        const code = '';
        const field = error.fields;
        const filed_message = this.i18n.translate(
          'error.foreign_key_constraint_fails',
          {
            lang: I18nContext.current().lang,
          },
        );
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
  }

  async findAll(pagingCarDto: PagingCarDto): Promise<AllCarResponseDto> {
    let {
      limit,
      offset,
      types,
      capacities,
      price,
      name,
      city,
      pick_date_time,
      drop_date_time,
    } = pagingCarDto;
    let carInDB;
    if (!limit) limit = 20;
    if (!offset) offset = 0;
    carInDB = await this.carsRepository.findAndCountAll({
      where: {
        ...(pick_date_time &&
          drop_date_time && {
            id: {
              [Op.notIn]: sequelize.literal(
                `(SELECT car_id FROM orders WHERE 
                        (order_status_id IN (1, 2) AND
                          (
                            (pick_date_time <= '${drop_date_time}' AND drop_date_time >= '${pick_date_time}')
                            OR (pick_date_time >= '${pick_date_time}' AND drop_date_time <= '${drop_date_time}')
                            OR (pick_date_time <= '${pick_date_time}' AND drop_date_time >= '${pick_date_time}')
                            OR (pick_date_time <= '${drop_date_time}' AND drop_date_time >= '${drop_date_time}')
                          )
                        )
                      )
                      `,
              ),
            },
          }),
        ...(types && {
          car_type_id: {
            [Op.or]: !types ? [] : types.toString().split(',').map(Number),
          },
        }),
        ...(capacities && {
          car_capacity_id: {
            [Op.or]: !capacities
              ? []
              : capacities.toString().split(',').map(Number),
          },
        }),
        ...(name && { name: { [Op.like]: `%${name}%` } }),
      },
      group: ['Car.id', 'CarPrice.id'],
      include: [
        {
          model: Office,
          where: {
            ...(city && { city: { [Op.like]: `%${city}%` } }),
          },
        },
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
        CarSteering,
        {
          model: CarPrice,
          where: {
            status: ECarPrice.new,
            ...(price && { rental_price: { [Op.lte]: +price } }),
          },
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
          model: Order,
          required: false,
          where: {
            ...(pick_date_time &&
              drop_date_time && {
                [Op.or]: [
                  {
                    pick_date_time: { [Op.gt]: drop_date_time },
                  },
                  {
                    drop_date_time: { [Op.lt]: pick_date_time },
                  },
                ],
              }),
          },
        },
      ],
      offset: +offset,
      limit: +limit,
    });
    return new AllCarResponseDto(
      carInDB.rows.map((car) => new CarResponseDto(car)),
      carInDB.count.length,
      +offset,
      +limit,
    );
  }

  async findCarById(carId: number): Promise<Car> {
    let carInDB = await this.carsRepository.findOne<Car>({
      where: { id: carId },
      include: [
        Office,
        CarType,
        CarCapacity,
        CarStatus,
        CarSteering,
        {
          model: CarPrice,
          where: { status: ECarPrice.new },
        },
        {
          model: CarImage,
          where: { car_id: carId },
          required: false,
        },
        {
          model: UserReviewCar,
          where: { car_id: carId },
          include: [User],
          required: false,
        },
      ],
    } as FindOptions);
    return carInDB;
  }

  async findOne(id: number): Promise<CarResponseDto> {
    let carInDB = await this.findCarById(id);
    if (!carInDB) {
      let message = this.i18n.translate('error.car_does_not_exist', {
        lang: I18nContext.current().lang,
      });
      this.appExceptionService.badRequestException(
        BadRequestCode.BA_CAR_DOES_NOT_EXIST,
        '',
        message,
        [],
      );
    }
    return new CarResponseDto(carInDB);
  }

  async update(
    id: number,
    updateCarDto: UpdateCarDto,
  ): Promise<UpdateCarResponseDto> {
    let carInDB = await this.carsRepository.findOne({
      where: { id: id },
    } as FindOptions);
    if (!carInDB) {
      let message = this.i18n.translate('error.car_does_not_exist', {
        lang: I18nContext.current().lang,
      });
      this.appExceptionService.badRequestException(
        BadRequestCode.BA_CAR_DOES_NOT_EXIST,
        '',
        message,
        [],
      );
    }
    let carStatusInDB = await this.carStatuesRepository.findOne({
      where: { id: updateCarDto.car_status_id },
    } as FindOptions);
    if (carStatusInDB && carStatusInDB.status === ECarStatus.available) {
      let fromDateTimeValid = isDateValid(updateCarDto.from_date_time);
      if (!fromDateTimeValid) {
        let message = this.i18n.translate('error.data_type', {
          lang: I18nContext.current().lang,
        });
        const code = '';
        const field = 'from_date_time';
        const filed_message = this.i18n.translate(
          'error.incorrect_datetime_value',
          {
            lang: I18nContext.current().lang,
          },
        );
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
      let originalPriceValid = isPriceValid(updateCarDto.original_price);
      if (!originalPriceValid) {
        let message = this.i18n.translate('error.data_type', {
          lang: I18nContext.current().lang,
        });
        const code = '';
        const field = 'original_price';
        const filed_message = this.i18n.translate(
          'error.incorrect_decimal_value',
          {
            lang: I18nContext.current().lang,
          },
        );
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
      let rentalPriceValid = isPriceValid(updateCarDto.rental_price);
      if (!rentalPriceValid) {
        let message = this.i18n.translate('error.data_type', {
          lang: I18nContext.current().lang,
        });
        const code = '';
        const field = 'rental_price';
        const filed_message = this.i18n.translate(
          'error.incorrect_decimal_value',
          {
            lang: I18nContext.current().lang,
          },
        );
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
    }
    try {
      await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };
        await this.carsRepository.update<Car>(
          {
            office_id: updateCarDto.office_id,
            car_type_id: updateCarDto.car_type_id,
            car_capacity_id: updateCarDto.car_capacity_id,
            car_steering_id: updateCarDto.car_steering_id,
            car_status_id: updateCarDto.car_status_id,
            name: updateCarDto.name,
            gasoline: updateCarDto.gasoline,
          },
          { where: { id: id }, transactionHost } as UpdateOptions,
        );

        let carPriceInDB = await this.carPricesRepository.findOne<CarPrice>({
          where: { car_id: id, status: ECarPrice.new },
        } as FindOptions);
        if (
          carPriceInDB &&
          carPriceInDB.rental_price !== null &&
          carPriceInDB.original_price !== null &&
          carPriceInDB.from_date_time !== null
        ) {
          if (
            carPriceInDB.rental_price != updateCarDto.rental_price ||
            carPriceInDB.original_price != updateCarDto.original_price ||
            !isSameDateTime(
              carPriceInDB.from_date_time,
              updateCarDto.from_date_time,
            )
          ) {
            await this.carPricesRepository.update<CarPrice>(
              {
                status: ECarPrice.old,
              },
              {
                where: { id: carPriceInDB.id },
                transactionHost,
              } as UpdateOptions,
            );
            let carPrice = new CarPrice();
            carPrice.car_id = id;
            carPrice.original_price = updateCarDto.original_price;
            carPrice.rental_price = updateCarDto.rental_price;
            carPrice.from_date_time = updateCarDto.from_date_time;
            carPrice.to_date_time = updateCarDto.to_date_time;
            await carPrice.save(transactionHost);
          }
        } else {
          await this.carPricesRepository.update<CarPrice>(
            {
              original_price: updateCarDto.original_price,
              rental_price: updateCarDto.rental_price,
              from_date_time: updateCarDto.from_date_time,
              to_date_time: updateCarDto.to_date_time,
            },
            {
              where: { id: carPriceInDB.id },
              transactionHost,
            } as UpdateOptions,
          );
        }
        await this.carImagesRepository.destroy<CarImage>({
          where: { car_id: id },
          transactionHost,
        } as DestroyOptions);
        let imageLength = updateCarDto.images.length;
        for (
          let i = 0;
          i < (imageLength === 0 || imageLength < 4 ? 4 : imageLength);
          i++
        ) {
          let carImage = new CarImage();
          carImage.car_id = id;
          if (imageLength !== 0) carImage.image_url = updateCarDto.images[i];
          await carImage.save(transactionHost);
        }
      });
      return new UpdateCarResponseDto();
    } catch (error) {
      if (
        [
          'ER_TRUNCATED_WRONG_VALUE',
          'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD',
        ].includes(error.original.code)
      ) {
        let message = this.i18n.translate('error.data_type', {
          lang: I18nContext.current().lang,
        });
        const code = '';
        const field = '';
        const filed_message = error.message;
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
      if (['ER_NO_REFERENCED_ROW_2'].includes(error.original.code)) {
        let message = this.i18n.translate('error.data_type', {
          lang: I18nContext.current().lang,
        });
        const code = '';
        const field = error.fields;
        const filed_message = this.i18n.translate(
          'error.foreign_key_constraint_fails',
          {
            lang: I18nContext.current().lang,
          },
        );
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
  }

  async remove(id: number) {
    try {
      await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };
        let carInDB = await this.carsRepository.findOne<Car>({
          where: { id: id },
        } as FindOptions);
        if (!carInDB) {
          let message = this.i18n.translate('error.car_does_not_exist', {
            lang: I18nContext.current().lang,
          });
          this.appExceptionService.badRequestException(
            BadRequestCode.BA_CAR_DOES_NOT_EXIST,
            '',
            message,
            [],
          );
        }
        await carInDB.destroy(transactionHost);
      });
    } catch (error) {
      if (['ER_ROW_IS_REFERENCED_2'].includes(error.original.code)) {
        let message = this.i18n.translate('error.data_type', {
          lang: I18nContext.current().lang,
        });
        const code = '';
        const field = error.fields;
        const filed_message = this.i18n.translate(
          'error.foreign_key_constraint_fails',
          {
            lang: I18nContext.current().lang,
          },
        );
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
  }

  async favorite(
    userId: number,
    carId: number,
    createUserFavoriteCarDto: CreateUserFavoriteCarDto,
  ): Promise<CreateUserFavoriteCarResponseDto> {
    if (createUserFavoriteCarDto.favorite) {
      try {
        let userFavoriteCar = new UserFavoriteCar();
        userFavoriteCar.user_id = userId;
        userFavoriteCar.car_id = carId;
        await userFavoriteCar.save();
      } catch (error) {
        if (error.original.code === 'ER_DUP_ENTRY') {
          if (error.errors.length > 0) {
            const transformedErrors = error.errors.map((e) => {
              const code = '';
              const field = e.path;
              const message = e.message;
              let detail: IDetailExceptionMessage = { code, field, message };
              return detail;
            });
            let message = this.i18n.translate('error.data_type', {
              lang: I18nContext.current().lang,
            });
            this.appExceptionService.badRequestException(
              BadRequestCode.BA_USER_FAVORITE_CAR_MUST_ABE_UNIQUE,
              '',
              message,
              transformedErrors,
            );
          }
        }
        if (['ER_NO_REFERENCED_ROW_2'].includes(error.original.code)) {
          let message = this.i18n.translate('error.data_type', {
            lang: I18nContext.current().lang,
          });
          const code = '';
          const field = error.fields;
          const filed_message = this.i18n.translate(
            'error.foreign_key_constraint_fails',
            {
              lang: I18nContext.current().lang,
            },
          );
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
    } else {
      await this.userFavoriteCarRepository.destroy({
        where: { user_id: userId, car_id: carId },
      });
    }
    return new CreateUserFavoriteCarResponseDto();
  }

  async createReview(
    userId: number,
    carId: number,
    createUserReviewCarDto: CreateUserReviewCarDto,
  ): Promise<CreateUserReviewCarResponseDto> {
    try {
      let userReviewCar = new UserReviewCar();
      userReviewCar.user_id = userId;
      userReviewCar.car_id = carId;
      if (createUserReviewCarDto.rate < 1) userReviewCar.rate = 1;
      else if (createUserReviewCarDto.rate > 5) userReviewCar.rate = 5;
      else userReviewCar.rate = createUserReviewCarDto.rate;
      userReviewCar.title = createUserReviewCarDto.title;
      userReviewCar.comment = createUserReviewCarDto.comment;
      await userReviewCar.save();
    } catch (error) {
      if (error.original.code === 'ER_DUP_ENTRY') {
        if (error.errors.length > 0) {
          const transformedErrors = error.errors.map((e) => {
            const code = '';
            const field = e.path;
            const message = e.message;
            let detail: IDetailExceptionMessage = { code, field, message };
            return detail;
          });
          let message = this.i18n.translate('error.data_type', {
            lang: I18nContext.current().lang,
          });
          this.appExceptionService.badRequestException(
            BadRequestCode.BA_USER_FAVORITE_CAR_MUST_ABE_UNIQUE,
            '',
            message,
            transformedErrors,
          );
        }
      }
      if (['ER_BAD_FIELD_ERROR'].includes(error.original.code)) {
        let message = this.i18n.translate('error.data_type', {
          lang: I18nContext.current().lang,
        });
        const code = '';
        const field = error.fields;
        const filed_message = this.i18n.translate(
          'error.foreign_key_constraint_fails',
          {
            lang: I18nContext.current().lang,
          },
        );
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
    return new CreateUserReviewCarResponseDto();
  }

  async updateReview(
    userId: number,
    carId: number,
    updateUserReviewCarDto: UpdateUserReviewCarDto,
  ): Promise<UpdateUserReviewCarResponseDto> {
    let reviewInDB = await this.userReviewCarRepository.findOne({
      where: {
        user_id: userId,
        car_id: carId,
      },
    } as FindOptions);
    if (!reviewInDB) {
      let message = this.i18n.translate('error.data_type', {
        lang: I18nContext.current().lang,
      });
      const code = '';
      const field = '';
      const filed_message = this.i18n.translate(
        'error.foreign_key_constraint_fails',
        {
          lang: I18nContext.current().lang,
        },
      );
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
    try {
      let rate = updateUserReviewCarDto.rate;
      if (updateUserReviewCarDto.rate < 1) rate = 1;
      else if (updateUserReviewCarDto.rate > 5) rate = 5;
      await this.userReviewCarRepository.update(
        {
          rate: rate,
          title: updateUserReviewCarDto.title,
          comment: updateUserReviewCarDto.comment,
        },
        { where: { user_id: userId, car_id: carId } } as UpdateOptions,
      );
    } catch (error) {
      if (error.original.code === 'ER_DUP_ENTRY') {
        if (error.errors.length > 0) {
          const transformedErrors = error.errors.map((e) => {
            const code = '';
            const field = e.path;
            const message = e.message;
            let detail: IDetailExceptionMessage = { code, field, message };
            return detail;
          });
          let message = this.i18n.translate('error.data_type', {
            lang: I18nContext.current().lang,
          });
          this.appExceptionService.badRequestException(
            BadRequestCode.BA_USER_FAVORITE_CAR_MUST_ABE_UNIQUE,
            '',
            message,
            transformedErrors,
          );
        }
      }
      if (['ER_BAD_FIELD_ERROR'].includes(error.original.code)) {
        let message = this.i18n.translate('error.data_type', {
          lang: I18nContext.current().lang,
        });
        const code = '';
        const field = error.fields;
        const filed_message = this.i18n.translate(
          'error.foreign_key_constraint_fails',
          {
            lang: I18nContext.current().lang,
          },
        );
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
    return new UpdateUserReviewCarResponseDto();
  }

  async isFavorite(
    userId: number,
    carId: number,
  ): Promise<UserFavoriteCarResponseDto> {
    let userFavoriteCarInDB =
      await this.userFavoriteCarRepository.findOne<UserFavoriteCar>({
        where: {
          user_id: userId,
          car_id: carId,
        },
      } as FindOptions);
    if (!userFavoriteCarInDB) {
      return new UserFavoriteCarResponseDto(false);
    }
    return new UserFavoriteCarResponseDto(true);
  }

  async getFavoriteCarByUser(
    userId: number,
  ): Promise<UserFavoriteCarsResponseDto> {
    let userFavoriteCarInDB =
      await this.userFavoriteCarRepository.findAll<UserFavoriteCar>({
        where: {
          user_id: userId,
        },
      } as FindOptions);
    if (!userFavoriteCarInDB) {
      return new UserFavoriteCarsResponseDto([]);
    }
    return new UserFavoriteCarsResponseDto(
      userFavoriteCarInDB.map((item) => item.car_id),
    );
  }
}
