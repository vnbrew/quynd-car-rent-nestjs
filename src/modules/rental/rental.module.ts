import { Module } from "@nestjs/common";
import { RentalService } from "./rental.service";
import { RentalController } from "./rental.controller";
import { rentalsProviders } from "./rental.provider";
import { AppExceptionModule } from "../../shared/exception/app.exception.module";
import { databaseProvider } from "../../shared/database/database.provider";
import { CarsModule } from "../cars/cars.module";
import { QueueModule } from "../../shared/queue/queue.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    AppExceptionModule,
    CarsModule,
    QueueModule,
    UsersModule
  ],
  controllers: [RentalController],
  providers: [RentalService, ...rentalsProviders, ...databaseProvider],
  exports: [RentalService]
})
export class RentalModule {
}
