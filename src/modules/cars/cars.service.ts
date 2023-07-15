import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { CreateCarResponseDto } from "./dto/create-car-response.dto";
import {
  CAR_CAPACITIES_REPOSITORY, CAR_PRICES_REPOSITORY, CAR_STATUSES_REPOSITORY, CAR_STEERINGS_REPOSITORY,
  CAR_TYPES_REPOSITORY,
  CARS_REPOSITORY,
  OFFICES_REPOSITORY,
  SEQUELIZE
} from "../../core/constants";
import { FindOptions } from "sequelize";
import { UpdateOptions } from "sequelize/types/model";
import { Car } from "./entities/car.entity";
import { AppExceptionService } from "../../core/exception/app.exception.service";
import { I18nContext, I18nService } from "nestjs-i18n";
import { IDetailExceptionMessage } from "../../core/exception/app.exception.interface";
import { BadRequestCode, InternalServerErrorCode } from "../../shared/enum/exception-code";
import { UpdateCarResponseDto } from "./dto/update-car-response.dto";
import { CarResponseDto } from "./dto/car-response.dto";
import { CarType } from "./entities/car-type.entity";
import { Office } from "./entities/car-office.entity";
import { CarCapacity } from "./entities/car-capacity.entity";
import { CarStatus } from "./entities/car-status.entity";
import { CarSteering } from "./entities/car-steering.entity";
import { CarPrice } from "./entities/car-price.entity";
import { Sequelize } from "sequelize-typescript";
import { Inject, Injectable } from "@nestjs/common";
import { ECarPrice, ECarStatus } from "../../shared/enum/car.enum";
import { isDateValid, isPriceValid, isSameDateTime } from "../../shared/utils/ultils";

@Injectable()
export class CarsService {

  constructor(
    @Inject(SEQUELIZE) private readonly sequelize: Sequelize,
    @Inject(CARS_REPOSITORY) private readonly carsRepository: typeof Car,
    @Inject(OFFICES_REPOSITORY) private readonly officesRepository: typeof Office,
    @Inject(CAR_TYPES_REPOSITORY) private readonly carTypesRepository: typeof CarType,
    @Inject(CAR_CAPACITIES_REPOSITORY) private readonly carCapacitiesRepository: typeof CarCapacity,
    @Inject(CAR_STEERINGS_REPOSITORY) private readonly carSteeringRepository: typeof CarSteering,
    @Inject(CAR_STATUSES_REPOSITORY) private readonly carStatuesRepository: typeof CarStatus,
    @Inject(CAR_PRICES_REPOSITORY) private readonly carPricesRepository: typeof CarPrice,
    private readonly appExceptionService: AppExceptionService,
    private readonly i18n: I18nService
  ) {
  }

  async create(createCarDto: CreateCarDto): Promise<CreateCarResponseDto> {
    let carStatusInDB = await this.carStatuesRepository.findOne({ where: { id: createCarDto.car_status_id } } as FindOptions);
    if (carStatusInDB && carStatusInDB.status === ECarStatus.available) {
      let fromDateTimeValid = isDateValid(createCarDto.from_date_time);
      if (!fromDateTimeValid) {
        let message = this.i18n.translate("error.data_type", {
          lang: I18nContext.current().lang
        });
        const code = "";
        const field = "from_date_time";
        const filed_message = this.i18n.translate("error.incorrect_datetime_value", {
          lang: I18nContext.current().lang
        });
        let detail: IDetailExceptionMessage = { code, field, message: filed_message };
        this.appExceptionService.badRequestException(BadRequestCode.BA_IN_CORRECT_DATA_TYPE, "", message, [detail]);
      }
      let originalPriceValid = isPriceValid(createCarDto.original_price);
      if (!originalPriceValid) {
        let message = this.i18n.translate("error.data_type", {
          lang: I18nContext.current().lang
        });
        const code = "";
        const field = "original_price";
        const filed_message = this.i18n.translate("error.incorrect_decimal_value", {
          lang: I18nContext.current().lang
        });
        let detail: IDetailExceptionMessage = { code, field, message: filed_message };
        this.appExceptionService.badRequestException(BadRequestCode.BA_IN_CORRECT_DATA_TYPE, "", message, [detail]);
      }
      let rentalPriceValid = isPriceValid(createCarDto.rental_price);
      if (!rentalPriceValid) {
        let message = this.i18n.translate("error.data_type", {
          lang: I18nContext.current().lang
        });
        const code = "";
        const field = "rental_price";
        const filed_message = this.i18n.translate("error.incorrect_decimal_value", {
          lang: I18nContext.current().lang
        });
        let detail: IDetailExceptionMessage = { code, field, message: filed_message };
        this.appExceptionService.badRequestException(BadRequestCode.BA_IN_CORRECT_DATA_TYPE, "", message, [detail]);
      }
    }
    try {
      await this.sequelize.transaction(async t => {
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
      });
      return new CreateCarResponseDto();
    } catch (error) {
      if (["ER_TRUNCATED_WRONG_VALUE", "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD"].includes(error.original.code)) {
        let message = this.i18n.translate("error.data_type", {
          lang: I18nContext.current().lang
        });
        const code = "";
        const field = "";
        const filed_message = error.message;
        let detail: IDetailExceptionMessage = { code, field, message: filed_message };
        this.appExceptionService.badRequestException(BadRequestCode.BA_IN_CORRECT_DATA_TYPE, "", message, [detail]);
      }
      if (["ER_NO_REFERENCED_ROW_2"].includes(error.original.code)) {
        let message = this.i18n.translate("error.data_type", {
          lang: I18nContext.current().lang
        });
        const code = "";
        const field = error.fields;
        const filed_message = this.i18n.translate("error.foreign_key_constraint_fails", {
          lang: I18nContext.current().lang
        });
        let detail: IDetailExceptionMessage = { code, field, message: filed_message };
        this.appExceptionService.badRequestException(BadRequestCode.BA_IN_CORRECT_DATA_TYPE, "", message, [detail]);
      }
      let message = this.i18n.translate("error.internal_server_error", {
        lang: I18nContext.current().lang
      });
      this.appExceptionService.internalServerErrorException(InternalServerErrorCode.IN_COMMON_ERROR, "", message, [error]);
    }
  }

  findAll() {
    return `This action returns all cars`;
  }

  async findOne(id: number): Promise<CarResponseDto> {
    let carInDB = await this.carsRepository.findOne<Car>({
      where: { id }, include: [
        Office, CarType, CarCapacity, CarStatus, CarSteering, CarPrice
      ]
    } as FindOptions);
    if (!carInDB) {
      let message = this.i18n.translate("error.car_does_not_exist", {
        lang: I18nContext.current().lang
      });
      this.appExceptionService.badRequestException(BadRequestCode.BA_CAR_DOES_NOT_EXIST, "", message, []);
    }
    return new CarResponseDto(carInDB);
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<UpdateCarResponseDto> {
    let carInDB = await this.carsRepository.findOne({ where: { id: id } } as FindOptions);
    if (!carInDB) {
      let message = this.i18n.translate("error.car_does_not_exist", {
        lang: I18nContext.current().lang
      });
      this.appExceptionService.badRequestException(BadRequestCode.BA_CAR_DOES_NOT_EXIST, "", message, []);
    }
    let carStatusInDB = await this.carStatuesRepository.findOne({ where: { id: updateCarDto.car_status_id } } as FindOptions);
    if (carStatusInDB && carStatusInDB.status === ECarStatus.available) {
      let fromDateTimeValid = isDateValid(updateCarDto.from_date_time);
      if (!fromDateTimeValid) {
        let message = this.i18n.translate("error.data_type", {
          lang: I18nContext.current().lang
        });
        const code = "";
        const field = "from_date_time";
        const filed_message = this.i18n.translate("error.incorrect_datetime_value", {
          lang: I18nContext.current().lang
        });
        let detail: IDetailExceptionMessage = { code, field, message: filed_message };
        this.appExceptionService.badRequestException(BadRequestCode.BA_IN_CORRECT_DATA_TYPE, "", message, [detail]);
      }
      let originalPriceValid = isPriceValid(updateCarDto.original_price);
      if (!originalPriceValid) {
        let message = this.i18n.translate("error.data_type", {
          lang: I18nContext.current().lang
        });
        const code = "";
        const field = "original_price";
        const filed_message = this.i18n.translate("error.incorrect_decimal_value", {
          lang: I18nContext.current().lang
        });
        let detail: IDetailExceptionMessage = { code, field, message: filed_message };
        this.appExceptionService.badRequestException(BadRequestCode.BA_IN_CORRECT_DATA_TYPE, "", message, [detail]);
      }
      let rentalPriceValid = isPriceValid(updateCarDto.rental_price);
      if (!rentalPriceValid) {
        let message = this.i18n.translate("error.data_type", {
          lang: I18nContext.current().lang
        });
        const code = "";
        const field = "rental_price";
        const filed_message = this.i18n.translate("error.incorrect_decimal_value", {
          lang: I18nContext.current().lang
        });
        let detail: IDetailExceptionMessage = { code, field, message: filed_message };
        this.appExceptionService.badRequestException(BadRequestCode.BA_IN_CORRECT_DATA_TYPE, "", message, [detail]);
      }
    }
    try {
      await this.sequelize.transaction(async t => {
          const transactionHost = { transaction: t };
          await this.carsRepository.update<Car>({
            office_id: updateCarDto.office_id,
            car_type_id: updateCarDto.car_type_id,
            car_capacity_id: updateCarDto.car_capacity_id,
            car_steering_id: updateCarDto.car_steering_id,
            car_status_id: updateCarDto.car_status_id,
            name: updateCarDto.name,
            gasoline: updateCarDto.gasoline
          }, { where: { id: id }, transactionHost } as UpdateOptions);

          let carPriceInDB = await this.carPricesRepository.findOne<CarPrice>({
            where: { car_id: id, status: ECarPrice.new }
          } as FindOptions);
          if (carPriceInDB
            && carPriceInDB.rental_price !== null
            && carPriceInDB.original_price !== null
            && carPriceInDB.from_date_time !== null) {
            if (carPriceInDB.rental_price != updateCarDto.rental_price
              || carPriceInDB.original_price != updateCarDto.original_price
              || !isSameDateTime(carPriceInDB.from_date_time, updateCarDto.from_date_time)
            ) {
              await this.carPricesRepository.update<CarPrice>({
                  status: ECarPrice.old
                },
                { where: { id: carPriceInDB.id }, transactionHost } as UpdateOptions);
              let carPrice = new CarPrice();
              carPrice.car_id = id;
              carPrice.original_price = updateCarDto.original_price;
              carPrice.rental_price = updateCarDto.rental_price;
              carPrice.from_date_time = updateCarDto.from_date_time;
              carPrice.to_date_time = updateCarDto.to_date_time;
              await carPrice.save(transactionHost);
            }
          } else {
            await this.carPricesRepository.update<CarPrice>({
                original_price: updateCarDto.original_price,
                rental_price: updateCarDto.rental_price,
                from_date_time: updateCarDto.from_date_time,
                to_date_time: updateCarDto.to_date_time
              },
              { where: { id: carPriceInDB.id }, transactionHost } as UpdateOptions);
          }
        }
      );
      return new UpdateCarResponseDto();
    } catch (error) {
      if (["ER_TRUNCATED_WRONG_VALUE", "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD"].includes(error.original.code)) {
        let message = this.i18n.translate("error.data_type", {
          lang: I18nContext.current().lang
        });
        const code = "";
        const field = "";
        const filed_message = error.message;
        let detail: IDetailExceptionMessage = { code, field, message: filed_message };
        this.appExceptionService.badRequestException(BadRequestCode.BA_IN_CORRECT_DATA_TYPE, "", message, [detail]);
      }
      if (["ER_NO_REFERENCED_ROW_2"].includes(error.original.code)) {
        let message = this.i18n.translate("error.data_type", {
          lang: I18nContext.current().lang
        });
        const code = "";
        const field = error.fields;
        const filed_message = this.i18n.translate("error.foreign_key_constraint_fails", {
          lang: I18nContext.current().lang
        });
        let detail: IDetailExceptionMessage = { code, field, message: filed_message };
        this.appExceptionService.badRequestException(BadRequestCode.BA_IN_CORRECT_DATA_TYPE, "", message, [detail]);
      }
      let message = this.i18n.translate("error.internal_server_error", {
        lang: I18nContext.current().lang
      });
      this.appExceptionService.internalServerErrorException(InternalServerErrorCode.IN_COMMON_ERROR, "", message, [error]);
    }
  }

  async remove(id: number) {
    try {
      await this.sequelize.transaction(async t => {
        const transactionHost = { transaction: t };
        let carInDB = await this.carsRepository.findOne<Car>({
          where: { id: id }
        } as FindOptions);
        if (!carInDB) {
          let message = this.i18n.translate("error.car_does_not_exist", {
            lang: I18nContext.current().lang
          });
          this.appExceptionService.badRequestException(BadRequestCode.BA_CAR_DOES_NOT_EXIST, "", message, []);
        }
        await this.carPricesRepository.destroy<CarPrice>({ where: { car_id: id } });
        await carInDB.destroy(transactionHost);
      });
    } catch (error) {
      if (["ER_ROW_IS_REFERENCED_2"].includes(error.original.code)) {
        let message = this.i18n.translate("error.data_type", {
          lang: I18nContext.current().lang
        });
        const code = "";
        const field = error.fields;
        const filed_message = this.i18n.translate("error.foreign_key_constraint_fails", {
          lang: I18nContext.current().lang
        });
        let detail: IDetailExceptionMessage = { code, field, message: filed_message };
        this.appExceptionService.badRequestException(BadRequestCode.BA_IN_CORRECT_DATA_TYPE, "", message, [detail]);
      }
      let message = this.i18n.translate("error.internal_server_error", {
        lang: I18nContext.current().lang
      });
      this.appExceptionService.internalServerErrorException(InternalServerErrorCode.IN_COMMON_ERROR, "", message, [error]);
    }

  }
}
