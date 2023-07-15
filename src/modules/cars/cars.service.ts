import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { CreateCarResponseDto } from "./dto/create-car-response.dto";
import { CARS_REPOSITORY } from "../../core/constants";
import { FindOptions } from "sequelize";
import { UpdateOptions } from "sequelize/types/model";
import { Car } from "./entities/car.entity";
import { AppExceptionService } from "../../core/exception/app.exception.service";
import { I18nContext, I18nService } from "nestjs-i18n";
import { IDetailExceptionMessage } from "../../core/exception/app.exception.interface";
import { BadRequestCode } from "../../shared/enum/exception-code";
import { UpdateCarResponseDto } from "./dto/update-car-response.dto";
import { Inject, Injectable } from "@nestjs/common";
import { CarResponseDto } from "./dto/car-response.dto";
import { CarType } from "./entities/car-type.entity";
import { Office } from "./entities/car-office.entity";
import { CarCapacity } from "./entities/car-capacity.entity";
import { CarStatus } from "./entities/car-status.entity";
import { CarSteering } from "./entities/car-steering.entity";

@Injectable()
export class CarsService {

  constructor(
    @Inject(CARS_REPOSITORY) private readonly carsRepository: typeof Car,
    private readonly appExceptionService: AppExceptionService,
    private readonly i18n: I18nService
  ) {
  }

  async create(createCarDto: CreateCarDto): Promise<CreateCarResponseDto> {
    try {
      let car = new Car();
      car.office_id = createCarDto.office_id;
      car.car_type_id = createCarDto.car_type_id;
      car.car_capacity_id = createCarDto.car_capacity_id;
      car.car_steering_id = createCarDto.car_steering_id;
      car.car_status_id = createCarDto.car_status_id;
      car.name = createCarDto.name;
      car.gasoline = createCarDto.gasoline;
      await car.save();
      return new CreateCarResponseDto();
    } catch (error) {
      let message = this.i18n.translate("error.data_type", {
        lang: I18nContext.current().lang
      });
      const code = "";
      const field = error.fields[0];
      const filed_message = error.message;
      let detail: IDetailExceptionMessage = { code, field, message: filed_message };
      this.appExceptionService.badRequestException(BadRequestCode.BA_IN_CORRECT_DATA_TYPE, "", message, [detail]);
    }
  }

  findAll() {
    return `This action returns all cars`;
  }

  async findOne(id: number): Promise<CarResponseDto> {
    let carInDB = await this.carsRepository.findOne({
      where: { id }, include: [
        Office, CarType, CarCapacity, CarStatus, CarSteering
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
    try {
      await this.carsRepository.update<Car>({
        office_id: updateCarDto.office_id,
        car_type_id: updateCarDto.car_type_id,
        car_capacity_id: updateCarDto.car_capacity_id,
        car_steering_id: updateCarDto.car_steering_id,
        car_status_id: updateCarDto.car_status_id,
        name: updateCarDto.name,
        gasoline: updateCarDto.gasoline
      }, { where: { id: id } } as UpdateOptions);
      return new UpdateCarResponseDto();
    } catch (error) {
      let message = this.i18n.translate("error.data_type", {
        lang: I18nContext.current().lang
      });
      const code = "";
      const field = error.fields[0];
      const filed_message = error.message;
      let detail: IDetailExceptionMessage = { code, field, message: filed_message };
      this.appExceptionService.badRequestException(BadRequestCode.BA_IN_CORRECT_DATA_TYPE, "", message, [detail]);
    }

    return `This action updates a #${id} car`;
  }

  async remove(id: number) {
    let carInDB = await this.carsRepository.findOne({ where: { id: id } } as FindOptions);
    if (!carInDB) {
      let message = this.i18n.translate("error.car_does_not_exist", {
        lang: I18nContext.current().lang
      });
      this.appExceptionService.badRequestException(BadRequestCode.BA_CAR_DOES_NOT_EXIST, "", message, []);
    }
    await carInDB.destroy();
  }
}
