import { Car } from "../entities/car.entity";

export class CarDto {
  readonly office_id!: number;
  readonly car_type_id!: number;
  readonly car_capacity_id!: number;
  readonly car_steering_id!: number;
  readonly car_status_id!: number;
  readonly name!: string;
  readonly gasoline!: number;
  readonly description?: string;

  constructor(car: Car) {
    this.office_id = car.office_id;
    this.car_type_id = car.car_type_id;
    this.car_capacity_id = car.car_capacity_id;
    this.car_steering_id = car.car_steering_id;
    this.car_status_id = car.car_status_id;
    this.name = car.name;
    this.gasoline = car.gasoline;
    this.description = car.description;
  }
}