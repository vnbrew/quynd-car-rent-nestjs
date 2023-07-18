import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Car } from "../../cars/entities/car.entity";
import { User } from "../../users/entities/user.entity";
import { RentalStatus } from "./rental-status.entity";

@Table({
  tableName: "rentals"
})
export class Rental extends Model<Rental> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  })
  id!: number;

  @ForeignKey(() => Car)
  @Column
  car_id!: number;

  @ForeignKey(() => User)
  @Column
  user_id!: number;

  @ForeignKey(() => RentalStatus)
  @Column
  rental_status_id!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  pick_date_time!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  drop_date_time!: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  detail?: string;
}
