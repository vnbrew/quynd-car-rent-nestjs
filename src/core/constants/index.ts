import { User } from "../../modules/users/entities/user.entity";
import { UserToken } from "../../modules/users/entities/user-token.entity";
import { SetMetadata } from "@nestjs/common";
import { Role } from "../../shared/enum/role";
import { Car } from "../../modules/cars/entities/car.entity";
import { Office } from "../../modules/cars/entities/car-office.entity";
import { CarType } from "../../modules/cars/entities/car-type.entity";
import { CarCapacity } from "../../modules/cars/entities/car-capacity.entity";
import { CarSteering } from "../../modules/cars/entities/car-steering.entity";
import { CarStatus } from "../../modules/cars/entities/car-status.entity";
import { CarPrice } from "../../modules/cars/entities/car-price.entity";
import { CarImage } from "../../modules/cars/entities/car-image.entity";
import { UserFavoriteCar } from "../../modules/cars/entities/user-favorite-car.entity";
import { UserReviewCar } from "../../modules/cars/entities/user-review-car.entity";

export const SEQUELIZE = "SEQUELIZE";
export const DEVELOPMENT = "development";
export const STAGING = "staging";
export const PRODUCTION = "production";

export const USERS_REPOSITORY = "USERS_REPOSITORY";
export const USER_TOKENS_REPOSITORY = "USER_TOKENS_REPOSITORY";
export const OFFICES_REPOSITORY = "OFFICES_REPOSITORY";
export const CAR_TYPES_REPOSITORY = "CAR_TYPES_REPOSITORY";
export const CAR_CAPACITIES_REPOSITORY = "CAR_CAPACITIES_REPOSITORY";
export const CAR_STEERINGS_REPOSITORY = "CAR_STEERINGS_REPOSITORY";
export const CAR_STATUSES_REPOSITORY = "CAR_STATUSES_REPOSITORY";
export const CAR_PRICES_REPOSITORY = "CAR_PRICES_REPOSITORY";
export const CAR_IMAGES_REPOSITORY = "CAR_IMAGES_REPOSITORY";
export const USER_FAVORITE_CAR_REPOSITORY = "USER_FAVORITE_CAR_REPOSITORY";
export const USER_REVIEWS_CAR_REPOSITORY = "USER_REVIEWS_CAR_REPOSITORY";
export const CARS_REPOSITORY = "CARS_REPOSITORY";
export const SEQUELIZE_MODELS = [
  User, UserToken,
  Office, CarType,
  CarCapacity, CarSteering,
  CarStatus, CarPrice,
  UserFavoriteCar, CarImage, UserReviewCar, Car
];

export const IS_PUBLIC_KEY = "isPublic";
export const SetPublic = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLES_KEY = "roles";
export const SetRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);