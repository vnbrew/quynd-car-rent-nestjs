import { Optional } from "@nestjs/common";
import { IsDate, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateRentalDto {

  @IsNumber()
  readonly car_id: number;

  @IsNumber()
  readonly rental_status_id: number;

  @IsDate()
  @Type(() => Date)
  readonly pick_date_time: Date;

  @IsDate()
  @Type(() => Date)
  readonly drop_date_time: Date;

  readonly detail?: string;
}
