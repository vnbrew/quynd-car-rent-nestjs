import { PickCarCity } from '../entities/pick-car-city.entity';

export class PickCarCityResponseDto {
  readonly id: number;
  readonly city: string;

  constructor(pickCarCity: PickCarCity) {
    this.id = pickCarCity.city.id;
    this.city = pickCarCity.city.city;
  }
}
