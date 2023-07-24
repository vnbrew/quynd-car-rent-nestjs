import { Module } from "@nestjs/common";
import { CarsService } from "./cars.service";
import { CarsController } from "./cars.controller";
import { carsProviders } from "./cars.provider";
import { AppExceptionModule } from "../../shared/exception/app.exception.module";
import { databaseProvider } from "../../shared/database/database.provider";

@Module({
  imports: [AppExceptionModule],
  controllers: [CarsController],
  providers: [CarsService, ...carsProviders, ...databaseProvider],
  exports: [CarsService]
})
export class CarsModule {
}
