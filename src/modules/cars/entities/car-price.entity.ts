import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Car } from "./car.entity";
import { Role } from "../../../common/enum/role";
import { ECarPrice } from "../../../common/enum/car.enum";

@Table({
  tableName: "car_prices"
})
export class CarPrice extends Model<CarPrice> {
  @PrimaryKey
  @AutoIncrement
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Car)
  @Column({ allowNull: false })
  car_id: number;

  @Column({
    type: DataType.ENUM(ECarPrice.old, ECarPrice.new),
    allowNull: false,
    defaultValue: ECarPrice.new
  })
  status: string;

  @Column({ allowNull: true })
  rental_price?: number;

  @Column({ allowNull: true })
  original_price?: number;

  @Column
  from_date_time?: Date;

  @Column({ allowNull: true })
  to_date_time?: Date;

  @BelongsTo(() => Car)
  car: Car;
}