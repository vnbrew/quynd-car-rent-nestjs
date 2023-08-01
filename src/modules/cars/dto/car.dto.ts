import { Car } from '../entities/car.entity';

export class CarDto {
  readonly id: number;
  readonly name!: string;
  readonly gasoline!: number;
  readonly description?: string;
  readonly rental_price: number;
  readonly original_price: number;

  constructor(car: Car) {
    this.id = car.id;
    this.name = car.name;
    this.gasoline = car.gasoline;
    this.description = car.description;
    this.rental_price = parseFloat(car.rental_price.toString());
    this.original_price =  parseFloat(car.original_price.toString());
  }
}
