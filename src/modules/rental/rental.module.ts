import { Module } from "@nestjs/common";
import { RentalService } from "./rental.service";
import { RentalController } from "./rental.controller";
import { rentalsProviders } from "./rental.provider";
import { AppExceptionModule } from "../../core/exception/app.exception.module";

@Module({
  imports: [AppExceptionModule],
  controllers: [RentalController],
  providers: [RentalService, ...rentalsProviders],
  exports: []
})
export class RentalModule {
}
