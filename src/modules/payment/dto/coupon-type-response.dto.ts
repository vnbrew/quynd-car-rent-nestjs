import { CouponType } from '../entities/coupon-types.entity';

export class CouponTypeResponseDto {
  readonly id: number;
  readonly type: string;
  readonly description: string;

  constructor(couponType: CouponType) {
    this.id = couponType.id;
    this.type = couponType.type;
    this.description = couponType.description;
  }
}
