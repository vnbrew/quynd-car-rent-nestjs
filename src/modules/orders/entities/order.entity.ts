import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Car } from '../../cars/entities/car.entity';
import { User } from '../../users/entities/user.entity';
import { OrderStatus } from './order-status.entity';
import { Coupon } from './coupon.entity';
import { PaymentType } from './payment-type.entity';

@Table({
  tableName: 'orders',
})
export class Order extends Model<Order> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id!: number;

  @ForeignKey(() => Car)
  @Column
  car_id!: number;

  @BelongsTo(() => Car)
  car!: Car;

  @ForeignKey(() => User)
  @Column
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => OrderStatus)
  @Column
  order_status_id!: number;

  @BelongsTo(() => OrderStatus)
  order_status!: OrderStatus;

  @ForeignKey(() => PaymentType)
  @Column
  payment_type_id!: number;

  @BelongsTo(() => PaymentType)
  payment_type!: PaymentType;

  @ForeignKey(() => Coupon)
  @Column
  coupon_id!: number;

  @BelongsTo(() => Coupon)
  coupon!: Coupon;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  pick_date_time!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  drop_date_time!: Date;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  tax: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  order_date_time: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  paid_date_time: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  cancel_date_time: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  subtotal: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  discount: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  tax_price: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  total: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  detail?: string;
}
