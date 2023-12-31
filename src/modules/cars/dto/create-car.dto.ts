import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  readonly description?: string;

  readonly rental_price?: number;

  readonly original_price?: number;

  readonly from_date_time?: Date;

  readonly to_date_time?: Date;

  readonly images: string[];
}
