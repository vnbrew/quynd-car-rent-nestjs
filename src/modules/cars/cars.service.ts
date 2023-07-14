import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { CreateCarResponseDto } from "./dto/create-car-response.dto";
import { CARS_REPOSITORY, USERS_REPOSITORY } from "../../core/constants";
import { User } from "../users/entities/user.entity";
import { Car } from "./entities/car.entity";
import { AppExceptionService } from "../../core/exception/app.exception.service";
import { I18nContext, I18nService } from "nestjs-i18n";
import { IDetailExceptionMessage } from "../../core/exception/app.exception.interface";
import { BadRequestCode } from "../../shared/enum/exception-code";

@Injectable()
export class CarsService {

  constructor(
    @Inject(CARS_REPOSITORY) private readonly carsRepository: typeof Car,
    private readonly exceptionService: AppExceptionService,
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
      this.exceptionService.badRequestException(BadRequestCode.BA_IN_CORRECT_DATA_TYPE, "", message, [detail]);
    }
  }

  findAll() {
    return `This action returns all cars`;
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
