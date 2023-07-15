import { CarDto } from "./car.dto";
import { Car } from "../entities/car.entity";
import { CarType } from "../entities/car-type.entity";
import { Office } from "../entities/car-office.entity";
import { CarCapacity } from "../entities/car-capacity.entity";
import { CarStatus } from "../entities/car-status.entity";
import { CarSteering } from "../entities/car-steering.entity";

export class CarResponseDto extends CarDto {
  readonly office: Office;
  readonly carType: CarType;
  readonly carCapacity: CarCapacity;
  readonly carStatus: CarStatus;
  readonly carSteering: CarSteering;

  constructor(car: Car) {
    super(car);
    this.office = car.office;
    this.carType = car.type;
    this.carCapacity = car.capacity;
    this.carStatus = car.status;
    this.carSteering = car.steering;
  }
}