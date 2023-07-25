import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'car_types',
})
export class CarType extends Model<CarType> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type!: string;

  @Column(DataType.TEXT)
  description?: string;
}
