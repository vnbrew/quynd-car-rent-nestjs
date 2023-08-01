import {
  AutoIncrement,
  Column,
  DataType, HasMany,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";
import { PickCarCity } from "./pick-car-city.entity";
import { DropCarCity } from "./drop-car-city.entity";

@Table({
  tableName: 'cities',
})
export class City extends Model<City> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  city!: string;

  @HasMany(() => PickCarCity)
  pickCarCities: PickCarCity[];

  @HasMany(() => DropCarCity)
  dropCarCities: DropCarCity[];
}
