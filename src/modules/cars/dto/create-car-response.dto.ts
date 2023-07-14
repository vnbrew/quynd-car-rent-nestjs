import { CarDto } from "./car.dto";
import { Car } from "../entities/car.entity";

export class CreateCarResponseDto extends CarDto {
  constructor(car: Car) {
    super(car);
  }
}