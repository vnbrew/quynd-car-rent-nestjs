import { Module } from "@nestjs/common";
import { CarsService } from "./cars.service";
import { CarsController } from "./cars.controller";
import { carsProviders } from "./cars.provider";
import { AppExceptionModule } from "../../core/exception/app.exception.module";

@Module({
  imports: [AppExceptionModule],
  controllers: [CarsController],
  providers: [CarsService, ...carsProviders]
})
export class CarsModule {
}
