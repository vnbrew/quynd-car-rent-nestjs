import { Module } from "@nestjs/common";
import { RentalService } from "./rental.service";
import { RentalController } from "./rental.controller";
import { rentalsProviders } from "./rental.provider";
import { AppExceptionModule } from "../../core/exception/app.exception.module";
import { databaseProvider } from "../../core/database/database.provider";
import { CarsModule } from "../cars/cars.module";
import { QueueModule } from "../queue/queue.module";
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
