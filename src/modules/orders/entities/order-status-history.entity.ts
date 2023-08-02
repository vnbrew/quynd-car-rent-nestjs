import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Order } from './order.entity';
import { OrderStatus } from './order-status.entity';

@Table({
  tableName: 'order_status_history',
})
export class OrderStatusHistory extends Model<OrderStatusHistory> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id!: number;

  @ForeignKey(() => Order)
  @Column
  order_id!: number;

  @BelongsTo(() => Order)
  order!: Order;

  @ForeignKey(() => OrderStatus)
  @Column
  order_status_id!: number;

  @BelongsTo(() => OrderStatus)
  order_status!: OrderStatus;
}
