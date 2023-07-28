import { Car } from '../entities/car.entity';

export class CarDto {
  readonly id: number;
  readonly name!: string;
  readonly gasoline!: number;
  readonly description?: string;

  constructor(car: Car) {
    this.id = car.id;
    this.name = car.name;
    this.gasoline = car.gasoline;
    this.description = car.description;
  }
}
