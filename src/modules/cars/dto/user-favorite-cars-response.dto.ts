export class UserFavoriteCarsResponseDto {
  readonly car_ids: number[];

  constructor(car_ids: number[]) {
    this.car_ids = car_ids;
  }
}