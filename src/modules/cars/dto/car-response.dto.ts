import { CarDto } from "./car.dto";
import { Car } from "../entities/car.entity";
import { CarType } from "../entities/car-type.entity";
import { Office } from "../entities/car-office.entity";
import { CarCapacity } from "../entities/car-capacity.entity";
import { CarStatus } from "../entities/car-status.entity";
import { CarSteering } from "../entities/car-steering.entity";
import { CarPrice } from "../entities/car-price.entity";
import { CarImage } from "../entities/car-image.entity";
import { UserReviewCarResponseDto } from "./user-review-car.response.dto";

export class CarResponseDto extends CarDto {
  readonly office: Office;
  readonly car_type: CarType;
  readonly car_capacity: CarCapacity;
  readonly car_status: CarStatus;
  readonly car_steering: CarSteering;
  readonly car_price: CarPrice;
  readonly car_images: CarImage[];
  readonly reviews: UserReviewCarResponseDto[];

  constructor(car: Car) {
    super(car);
    this.office = car.office;
    this.car_type = car.type;
    this.car_capacity = car.capacity;
    this.car_status = car.status;
    this.car_steering = car.steering;
    this.car_price = car.carPrice;
    this.car_images = car.carImages;
    this.reviews = car.userReviewCars.map((userReviewCar) => new UserReviewCarResponseDto(userReviewCar));
  }
}