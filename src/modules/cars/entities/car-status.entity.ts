import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { STRING } from 'sequelize';

@Table({
  tableName: 'car_statuses',
})
export class CarStatus extends Model<CarStatus> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;
}
