import { CarDto } from './car.dto';
import { Car } from '../entities/car.entity';
import { CarType } from '../entities/car-type.entity';
import { CarCapacity } from '../entities/car-capacity.entity';
import { CarStatus } from '../entities/car-status.entity';
import { CarSteering } from '../entities/car-steering.entity';
import { CarImage } from '../entities/car-image.entity';
import { UserReviewCarResponseDto } from './user-review-car.response.dto';
import { PickCarCityResponseDto } from './pick-car-city.response.dto';
import { DropCarCityResponseDto } from './drop-car-city.response.dto';
import { Order } from '../../orders/entities/order.entity';

export class CarResponseDto extends CarDto {
  readonly car_type: CarType;
  readonly car_capacity: CarCapacity;
  readonly car_status: CarStatus;
  readonly car_steering: CarSteering;
  readonly car_images: CarImage[];
  readonly reviews: UserReviewCarResponseDto[];
  readonly can_pick_at: PickCarCityResponseDto[];
  readonly can_drop_at: DropCarCityResponseDto[];
  readonly has_orders: Order[];

  constructor(car: Car) {
    super(car);
    this.car_type = car.type;
    this.car_capacity = car.capacity;
    this.car_status = car.status;
    this.car_steering = car.steering;
    this.car_images = car.carImages;
    this.reviews = car.userReviewCars.map(
      (userReviewCar) => new UserReviewCarResponseDto(userReviewCar),
    );
    this.can_pick_at = car.pickCarCities.map(
      (pickAtCity) => new PickCarCityResponseDto(pickAtCity),
    );
    this.can_drop_at = car.dropCarCities.map(
      (dropAtCity) => new DropCarCityResponseDto(dropAtCity),
    );
    this.has_orders = car.orders;
  }
}
