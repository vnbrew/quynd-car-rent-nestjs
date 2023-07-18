import { Rental } from "../entities/rental.entity";
import { RentalStatus } from "../entities/rental-status.entity";
import { Car } from "../../cars/entities/car.entity";
import { User } from "../../users/entities/user.entity";

export class RentalResponseDto {
  readonly id: number;
  readonly car_id: number;
  readonly car: Car;
  readonly user_id: number;
  readonly user: User;
  readonly rental_status_id: number;
  readonly pick_date_time: Date;
  readonly drop_date_time: Date;
  readonly detail?: string;
  readonly rental_status: RentalStatus;

  constructor(rental: Rental) {
    this.id = rental.id;
    this.car_id = rental.car_id;
    this.car = rental.car;
    this.user_id = rental.user_id;
    this.user = rental.user;
    this.rental_status_id = rental.rental_status_id;
    this.pick_date_time = rental.pick_date_time;
    this.drop_date_time = rental.drop_date_time;
    this.detail = rental.detail;
    this.rental_status = rental.rental_status;
  }
}