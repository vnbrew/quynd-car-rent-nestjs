import { IsDate, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCouponDto {
  @IsNumber()
  @Type(() => Number)
  coupon_type_id: number;

  @IsString()
  @Type(() => String)
  code: string;

  @IsNumber()
  @Type(() => Number)
  value: number;

  @IsDate()
  @Type(() => Date)
  expiration_time: Date;
}
