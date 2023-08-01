import { DropCarCity } from "../entities/drop-car-city.entity";

export class DropCarCityResponseDto {
  readonly id: number;
  readonly city: string;

  constructor(dropCarCity: DropCarCity) {
    this.id = dropCarCity.city.id;
    this.city = dropCarCity.city.city;
  }
}
