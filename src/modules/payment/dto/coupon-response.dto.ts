import { Coupon } from "../entities/coupon.entity";
import { CouponTypeResponseDto } from "./coupon-type-response.dto";

export class CouponResponseDto {
  readonly id: number;
  readonly code: string;
  readonly value: number;
  readonly expiration_time: Date;
  readonly type: CouponTypeResponseDto;

  constructor(coupon: Coupon) {
    this.id = coupon.id;
    this.code = coupon.code;
    this.value = coupon.value;
    this.expiration_time = coupon.expiration_time;
    this.type = new CouponTypeResponseDto(coupon.couponType);
  }
}