import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Coupon } from './coupon.entity';
import { Rental } from '../../rental/entities/rental.entity';
import { PaymentStatus } from './payment-status.entity';
import { PaymentType } from './payment-type.entity';

@Table({
  tableName: 'payments',
})
export class Payment extends Model<Payment> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Rental)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rental_id: number;

  @ForeignKey(() => Coupon)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  coupon_id: number;

  @BelongsTo(() => Coupon)
  coupon?: Coupon;

  @ForeignKey(() => PaymentStatus)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  payment_status_id: number;

  @ForeignKey(() => PaymentType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  payment_type_id: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  tax: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  pay_date_time: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount: number;
}
