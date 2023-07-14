import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "car_steerings"
})
export class CarSteering extends Model<CarSteering> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  type: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  description?: string;
}