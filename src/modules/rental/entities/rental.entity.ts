import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";
import { Car } from "../../cars/entities/car.entity";
import { User } from "../../users/entities/user.entity";
import { RentalStatus } from "./rental-status.entity";
import { Payment } from "../../payment/entities/payment.entity";

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

  @BelongsTo(() => Car)
  car!: Car;

  @ForeignKey(() => User)
  @Column
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => RentalStatus)
  @Column
  rental_status_id!: number;

  @BelongsTo(() => RentalStatus)
  rental_status!: RentalStatus;

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

  @HasOne(() => Payment)
  payment: Payment;
}
