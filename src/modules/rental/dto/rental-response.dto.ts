import { Rental } from "../entities/rental.entity";
import { RentalStatus } from "../entities/rental-status.entity";
import { Car } from "../../cars/entities/car.entity";
import { User } from "../../users/entities/user.entity";
import { CarResponseDto } from "../../cars/dto/car-response.dto";
import { UserDto } from "../../users/dto/user.dto";
import { Payment } from "../../payment/entities/payment.entity";
import { PaymentResponseDto } from "../../payment/dto/payment-response.dto";

export class RentalResponseDto {
  readonly id: number;
  // readonly car_id: number;
  // readonly user_id: number;
  // readonly rental_status_id: number;
  readonly pick_date_time: Date;
  readonly drop_date_time: Date;
  readonly detail?: string;
  readonly car: CarResponseDto;
  readonly user: UserDto;
  readonly rental_status: RentalStatus;
  readonly payment: PaymentResponseDto;

  constructor(rental: Rental) {
    this.id = rental.id;
    // this.car_id = rental.car_id;
    // this.user_id = rental.user_id;
    // this.rental_status_id = rental.rental_status_id;
    this.pick_date_time = rental.pick_date_time;
    this.drop_date_time = rental.drop_date_time;
    this.detail = rental.detail;
    this.car = new CarResponseDto(rental.car);
    this.user = new UserDto(rental.user);
    this.rental_status = rental.rental_status;
    this.payment = new PaymentResponseDto(rental.payment);
  }
}