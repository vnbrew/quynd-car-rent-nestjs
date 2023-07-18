import { IsDate, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreatePaymentDto {
  @IsNumber()
  @Type(() => Number)
  readonly rental_id: number;

  readonly coupon_code?: string;

  @IsNumber()
  @Type(() => Number)
  readonly payment_status_id: number

  @IsNumber()
  @Type(() => Number)
  readonly payment_type_id: number

  @IsNumber()
  @Type(() => Number)
  readonly tax: number;
}
