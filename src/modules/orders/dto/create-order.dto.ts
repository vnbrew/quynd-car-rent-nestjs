import { IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsNumber()
  readonly car_id: number;

  @IsNumber()
  readonly order_status_id: number;

  @IsNumber()
  readonly payment_type_id: number;

  readonly coupon_code?: string;

  @IsDate()
  @Type(() => Date)
  readonly pick_date_time: Date;

  @IsDate()
  @Type(() => Date)
  readonly drop_date_time: Date;

  @IsNumber()
  @Type(() => Number)
  readonly tax: number;

  readonly detail?: string;
}
