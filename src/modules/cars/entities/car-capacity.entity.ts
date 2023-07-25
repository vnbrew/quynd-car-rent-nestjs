import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'car_capacities',
})
export class CarCapacity extends Model<CarCapacity> {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  id!: number;

  @Column({ type: DataType.STRING })
  type!: string;

  @Column({ type: DataType.TEXT })
  description?: string;
}
