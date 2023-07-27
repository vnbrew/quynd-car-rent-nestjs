import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'order_statuses',
})
export class OrderType extends Model<OrderType> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  })
  description?: string;
}
