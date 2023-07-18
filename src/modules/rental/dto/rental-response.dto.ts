import { Rental } from "../entities/rental.entity";
import { RentalStatus } from "../entities/rental-status.entity";

export class RentalResponseDto {
  readonly id: number;
  readonly car_id: number;
  readonly user_id: number;
  readonly rental_status_id: number;
  readonly pick_date_time: Date;
  readonly drop_date_time: Date;
  readonly detail?: string;
  readonly status: RentalStatus;

  constructor(rental: Rental) {
    this.id = rental.id;
    this.car_id = rental.car_id;
    this.user_id = rental.user_id;
    this.rental_status_id = rental.rental_status_id;
    this.pick_date_time = rental.pick_date_time;
    this.drop_date_time = rental.drop_date_time;
    this.detail = rental.detail;
    this.status = rental.status;
  }
}