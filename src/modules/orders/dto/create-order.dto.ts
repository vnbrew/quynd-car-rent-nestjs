import { IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsNumber()
  readonly car_id: number;

  @IsNumber()
  readonly order_status_id: number;

  @IsNumber()
  readonly billing_id: number;

  @IsNumber()
  readonly payment_type_id: number;

  readonly coupon_code?: string;

  @Type(() => Number)
  @IsNumber()
  public pick_city?: number;

  @IsDate()
  @Type(() => Date)
  readonly pick_date_time: Date;

  @Type(() => Number)
  @IsNumber()
  public drop_city?: number;

  @IsDate()
  @Type(() => Date)
  readonly drop_date_time: Date;

  @IsNumber()
  @Type(() => Number)
  readonly tax: number;

  readonly detail?: string;
}
