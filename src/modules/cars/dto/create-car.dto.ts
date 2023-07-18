import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Optional } from "@nestjs/common";

export class CreateCarDto {
  @IsNumber()
  @IsNotEmpty()
  readonly office_id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly car_type_id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly car_capacity_id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly car_steering_id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly car_status_id: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly gasoline: number;

  @Optional()
  @IsString()
  readonly description?: string;

  @Optional()
  @IsNumber()
  readonly rental_price?: number;

  @Optional()
  @IsNumber()
  readonly original_price?: number;

  @Optional()
  @IsDate()
  @Type(() => Date)
  readonly from_date_time?: Date;

  @Optional()
  @IsDate()
  @Type(() => Date)
  readonly to_date_time?: Date;

  @IsArray()
  @ValidateNested({ each: true })
  readonly images: string[];
}
