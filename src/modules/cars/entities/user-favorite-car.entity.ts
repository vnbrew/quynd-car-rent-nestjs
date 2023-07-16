import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "favorites"
})
export class UserFavoriteCar extends Model<UserFavoriteCar> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true
  })
  user_id!: number;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true
  })
  car_id!: number;
}