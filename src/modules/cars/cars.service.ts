import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CreateCarResponseDto } from './dto/create-car-response.dto';
import {
  CAR_CAPACITIES_REPOSITORY,
  CAR_IMAGES_REPOSITORY,
  CAR_STATUSES_REPOSITORY,
  CAR_STEERINGS_REPOSITORY,
  CAR_TYPES_REPOSITORY,
  CARS_REPOSITORY,
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
import { CarCapacity } from './entities/car-capacity.entity';
import { CarStatus } from './entities/car-status.entity';
import { CarSteering } from './entities/car-steering.entity';
import { Sequelize } from 'sequelize-typescript';
import { Inject, Injectable } from '@nestjs/common';
import { ECarStatus } from '../../common/enum/car.enum';
import { isDateValid, isPriceValid } from '../../common/utils/ultils';
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
import { Order } from '../orders/entities/order.entity';
import { PickCarCity } from './entities/pick-car-city.entity';
import { City } from './entities/city.entity';
import { DropCarCity } from './entities/drop-car-city.entity';

@Injectable()
export class CarsService {
  constructor(
    @Inject(SEQUELIZE) private readonly sequelize: Sequelize,
    @Inject(CARS_REPOSITORY) private readonly carsRepository: typeof Car,
    @Inject(CAR_TYPES_REPOSITORY)
    private readonly carTypesRepository: typeof CarType,
    @Inject(CAR_CAPACITIES_REPOSITORY)
    private readonly carCapacitiesRepository: typeof CarCapacity,
    @Inject(CAR_STEERINGS_REPOSITORY)
    private readonly carSteeringRepository: typeof CarSteering,
    @Inject(CAR_STATUSES_REPOSITORY)
    private readonly carStatuesRepository: typeof CarStatus,
    @Inject(CAR_IMAGES_REPOSITORY)
    private readonly carImagesRepository: typeof CarImage,
    @Inject(USER_FAVORITE_CAR_REPOSITORY)
    private readonly userFavoriteCarRepository: typeof UserFavoriteCar,
    @Inject(USER_REVIEWS_CAR_REPOSITORY)
    private readonly userReviewCarRepository: typeof UserReviewCar,
    private readonly appExceptionService: AppExceptionService,
    private readonly i18n: I18nService,
  ) {}

  async isCarAvailableAndCanPickDropAt(
    carId: number,
    pick: number,
    drop: number,
    transaction,
  ): Promise<Car> {
    const query = `(SELECT id FROM cars
        where id = ${carId} AND
        id IN (SELECT car_id FROM pick_car_city WHERE city_id = ${pick}) AND
        id IN (SELECT car_id FROM drop_car_city WHERE city_id = ${drop})
    )`;
    const isCarAvailable = await this.carsRepository.findOne<Car>({
      where: {
        id: { [Op.in]: sequelize.literal(query) },
      },
      lock: transaction.LOCK.UPDATE,
      transaction: transaction,
      include: [
        {
          model: CarStatus,
          where: {
            status: ECarStatus.available,
          },
        },
      ],
    } as FindOptions);
    return isCarAvailable;
  }

  async create(createCarDto: CreateCarDto): Promise<CreateCarResponseDto> {
    const carStatusInDB = await this.carStatuesRepository.findOne({
      where: { id: createCarDto.car_status_id },
    } as FindOptions);
    if (carStatusInDB && carStatusInDB.status === ECarStatus.available) {
      const fromDateTimeValid = isDateValid(createCarDto.from_date_time);
      if (!fromDateTimeValid) {
        const message = this.i18n.translate('error.data_type', {
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
        const detail: IDetailExceptionMessage = {
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
      const originalPriceValid = isPriceValid(createCarDto.original_price);
      if (!originalPriceValid) {
        const message = this.i18n.translate('error.data_type', {
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
        const detail: IDetailExceptionMessage = {
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
      const rentalPriceValid = isPriceValid(createCarDto.rental_price);
      if (!rentalPriceValid) {
        const message = this.i18n.translate('error.data_type', {
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
        const detail: IDetailExceptionMessage = {
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
        const car = new Car();
        car.car_type_id = createCarDto.car_type_id;
        car.car_capacity_id = createCarDto.car_capacity_id;
        car.car_steering_id = createCarDto.car_steering_id;
        car.car_status_id = createCarDto.car_status_id;
        car.name = createCarDto.name;
        car.gasoline = createCarDto.gasoline;
        car.description = createCarDto.description;
        const newCar = await car.save(transactionHost);

        const imageLength = createCarDto.images.length;
        for (
          let i = 0;
          i < (imageLength === 0 || imageLength < 4 ? 4 : imageLength);
          i++
        ) {
          const carImage = new CarImage();
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
        const message = this.i18n.translate('error.data_type', {
          lang: I18nContext.current().lang,
        });
        const code = '';
        const field = '';
        const filed_message = error.message;
        const detail: IDetailExceptionMessage = {
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
        const message = this.i18n.translate('error.data_type', {
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
        const detail: IDetailExceptionMessage = {
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
      const message = this.i18n.translate('error.internal_server_error', {
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
    const {
      limit,
      offset,
      types,
      capacities,
      price,
      name,
      pick_city,
      pick_date_time,
      drop_city,
      drop_date_time,
    } = pagingCarDto;

    const query = `(SELECT id FROM cars
        where
        id IN (SELECT car_id FROM pick_car_city WHERE city_id = '${pick_city}') AND
        id IN (SELECT car_id FROM drop_car_city WHERE city_id = '${drop_city}') AND
        id NOT IN (SELECT car_id FROM orders WHERE (order_status_id IN (1, 2) AND
            (
              (pick_date_time <= '${drop_date_time}' AND drop_date_time >= '${pick_date_time}')
              OR (pick_date_time >= '${pick_date_time}' AND drop_date_time <= '${drop_date_time}')
              OR (pick_date_time <= '${pick_date_time}' AND drop_date_time >= '${pick_date_time}')
              OR (pick_date_time <= '${drop_date_time}' AND drop_date_time >= '${drop_date_time}')
            )
          )
        )
    )`;

    const carsInDB = await this.carsRepository.findAndCountAll({
      where: {
        id: { [Op.in]: sequelize.literal(query) },
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
        ...(price && { rental_price: { [Op.lte]: +price } }),
        ...(name && { name: { [Op.like]: `%${name}%` } }),
      },
      offset: offset ? +offset : 0,
      limit: limit ? +limit : 20,
      group: ['Car.id'],
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
    });

    return new AllCarResponseDto(
      carsInDB.rows.map((car) => new CarResponseDto(car)),
      carsInDB.count.length,
      +offset,
      +limit,
    );
  }

  async findCarById(carId: number, transactionHost?): Promise<Car> {
    const carInDB = await this.carsRepository.findOne<Car>({
      where: { id: carId },
      transactionHost,
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
        {
          model: Order,
          required: false,
        },
      ],
    } as FindOptions);
    return carInDB;
  }

  async findOne(id: number): Promise<CarResponseDto> {
    const carInDB = await this.findCarById(id);
    if (!carInDB) {
      const message = this.i18n.translate('error.car_does_not_exist', {
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
    const carInDB = await this.carsRepository.findOne({
      where: { id: id },
    } as FindOptions);
    if (!carInDB) {
      const message = this.i18n.translate('error.car_does_not_exist', {
        lang: I18nContext.current().lang,
      });
      this.appExceptionService.badRequestException(
        BadRequestCode.BA_CAR_DOES_NOT_EXIST,
        '',
        message,
        [],
      );
    }
    const carStatusInDB = await this.carStatuesRepository.findOne({
      where: { id: updateCarDto.car_status_id },
    } as FindOptions);
    if (carStatusInDB && carStatusInDB.status === ECarStatus.available) {
      const fromDateTimeValid = isDateValid(updateCarDto.from_date_time);
      if (!fromDateTimeValid) {
        const message = this.i18n.translate('error.data_type', {
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
        const detail: IDetailExceptionMessage = {
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
      const originalPriceValid = isPriceValid(updateCarDto.original_price);
      if (!originalPriceValid) {
        const message = this.i18n.translate('error.data_type', {
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
        const detail: IDetailExceptionMessage = {
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
      const rentalPriceValid = isPriceValid(updateCarDto.rental_price);
      if (!rentalPriceValid) {
        const message = this.i18n.translate('error.data_type', {
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
        const detail: IDetailExceptionMessage = {
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
            car_type_id: updateCarDto.car_type_id,
            car_capacity_id: updateCarDto.car_capacity_id,
            car_steering_id: updateCarDto.car_steering_id,
            car_status_id: updateCarDto.car_status_id,
            name: updateCarDto.name,
            gasoline: updateCarDto.gasoline,
          },
          { where: { id: id }, transactionHost } as UpdateOptions,
        );

        await this.carImagesRepository.destroy<CarImage>({
          where: { car_id: id },
          transactionHost,
        } as DestroyOptions);
        const imageLength = updateCarDto.images.length;
        for (
          let i = 0;
          i < (imageLength === 0 || imageLength < 4 ? 4 : imageLength);
          i++
        ) {
          const carImage = new CarImage();
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
        const message = this.i18n.translate('error.data_type', {
          lang: I18nContext.current().lang,
        });
        const code = '';
        const field = '';
        const filed_message = error.message;
        const detail: IDetailExceptionMessage = {
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
        const message = this.i18n.translate('error.data_type', {
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
        const detail: IDetailExceptionMessage = {
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
      const message = this.i18n.translate('error.internal_server_error', {
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
        const carInDB = await this.carsRepository.findOne<Car>({
          where: { id: id },
        } as FindOptions);
        if (!carInDB) {
          const message = this.i18n.translate('error.car_does_not_exist', {
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
        const message = this.i18n.translate('error.data_type', {
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
        const detail: IDetailExceptionMessage = {
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
      const message = this.i18n.translate('error.internal_server_error', {
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
        const userFavoriteCar = new UserFavoriteCar();
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
              const detail: IDetailExceptionMessage = { code, field, message };
              return detail;
            });
            const message = this.i18n.translate('error.data_type', {
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
          const message = this.i18n.translate('error.data_type', {
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
          const detail: IDetailExceptionMessage = {
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
        const message = this.i18n.translate('error.internal_server_error', {
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
      const userReviewCar = new UserReviewCar();
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
            const detail: IDetailExceptionMessage = { code, field, message };
            return detail;
          });
          const message = this.i18n.translate('error.data_type', {
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
        const message = this.i18n.translate('error.data_type', {
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
        const detail: IDetailExceptionMessage = {
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
      const message = this.i18n.translate('error.internal_server_error', {
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
    const reviewInDB = await this.userReviewCarRepository.findOne({
      where: {
        user_id: userId,
        car_id: carId,
      },
    } as FindOptions);
    if (!reviewInDB) {
      const message = this.i18n.translate('error.data_type', {
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
      const detail: IDetailExceptionMessage = {
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
            const detail: IDetailExceptionMessage = { code, field, message };
            return detail;
          });
          const message = this.i18n.translate('error.data_type', {
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
        const message = this.i18n.translate('error.data_type', {
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
        const detail: IDetailExceptionMessage = {
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
      const message = this.i18n.translate('error.internal_server_error', {
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
    const userFavoriteCarInDB =
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
    const userFavoriteCarInDB =
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
