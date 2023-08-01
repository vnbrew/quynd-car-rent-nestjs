import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { City } from "./city.entity";
import { Car } from "./car.entity";

@Table({
  tableName: "pick_car_city"
})
export class PickCarCity extends Model<PickCarCity>{
  @ForeignKey(() => City)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  city_id!: number;
  @BelongsTo(() => City)
  city: City;

  @ForeignKey(() => Car)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  car_id!: number;
  @BelongsTo(() => Car)
  car: Car;
}