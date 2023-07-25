import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { CouponType } from './coupon-types.entity';

@Table({
  tableName: 'coupons',
})
export class Coupon extends Model<Coupon> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => CouponType)
  coupon_type_id: number;

  @BelongsTo(() => CouponType)
  couponType: CouponType;

  @Column
  code: string;

  @Column
  value: number;

  @Column
  expiration_time: Date;
}
