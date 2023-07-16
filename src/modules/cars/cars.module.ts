import { Module } from "@nestjs/common";
import { CarsService } from "./cars.service";
import { CarsController } from "./cars.controller";
import { carsProviders } from "./cars.provider";
import { AppExceptionModule } from "../../core/exception/app.exception.module";
import { databaseProvider } from "../../core/database/database.provider";

@Module({
  imports: [AppExceptionModule],
  controllers: [CarsController],
  providers: [CarsService, ...carsProviders, ...databaseProvider]
})
export class CarsModule {
}
