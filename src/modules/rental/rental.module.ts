import { Module } from "@nestjs/common";
import { RentalService } from "./rental.service";
import { RentalController } from "./rental.controller";
import { rentalsProviders } from "./rental.provider";
import { AppExceptionModule } from "../../core/exception/app.exception.module";
import { databaseProvider } from "../../core/database/database.provider";

@Module({
  imports: [AppExceptionModule],
  controllers: [RentalController],
  providers: [RentalService, ...rentalsProviders, ...databaseProvider],
  exports: []
})
export class RentalModule {
}
