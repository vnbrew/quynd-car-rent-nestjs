import { CARS_REPOSITORY, USER_TOKENS_REPOSITORY, USERS_REPOSITORY } from "../../core/constants";
import { Car } from "./entities/car.entity";

export const carsProviders = [
  {
    provide: CARS_REPOSITORY,
    useValue: Car
  },
];