import {
  CAR_CAPACITIES_REPOSITORY,
  CAR_IMAGES_REPOSITORY,
  CAR_STATUSES_REPOSITORY,
  CAR_STEERINGS_REPOSITORY,
  CAR_TYPES_REPOSITORY,
  CARS_REPOSITORY,
  USER_FAVORITE_CAR_REPOSITORY,
  USER_REVIEWS_CAR_REPOSITORY,
} from '../../shared/constants';
import { Car } from './entities/car.entity';
import { CarType } from './entities/car-type.entity';
import { CarCapacity } from './entities/car-capacity.entity';
import { CarSteering } from './entities/car-steering.entity';
import { CarStatus } from './entities/car-status.entity';
import { CarImage } from './entities/car-image.entity';
import { UserFavoriteCar } from './entities/user-favorite-car.entity';
import { UserReviewCar } from './entities/user-review-car.entity';

export const carsProviders = [
  {
    provide: CARS_REPOSITORY,
    useValue: Car,
  },
  {
    provide: CAR_TYPES_REPOSITORY,
    useValue: CarType,
  },
  {
    provide: CAR_CAPACITIES_REPOSITORY,
    useValue: CarCapacity,
  },
  {
    provide: CAR_STEERINGS_REPOSITORY,
    useValue: CarSteering,
  },
  {
    provide: CAR_STATUSES_REPOSITORY,
    useValue: CarStatus,
  },
  {
    provide: CAR_IMAGES_REPOSITORY,
    useValue: CarImage,
  },
  {
    provide: USER_FAVORITE_CAR_REPOSITORY,
    useValue: UserFavoriteCar,
  },
  {
    provide: USER_REVIEWS_CAR_REPOSITORY,
    useValue: UserReviewCar,
  },
];
