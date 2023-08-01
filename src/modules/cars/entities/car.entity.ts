import {
  AutoIncrement,
  Model,
  PrimaryKey,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { CarStatus } from './car-status.entity';
import { CarSteering } from './car-steering.entity';
import { CarType } from './car-type.entity';
import { CarCapacity } from './car-capacity.entity';
import { CarImage } from './car-image.entity';
import { UserReviewCar } from './user-review-car.entity';
import { Order } from '../../orders/entities/order.entity';
import { City } from "./city.entity";
import { PickCarCity } from "./pick-car-city.entity";
import { DropCarCity } from "./drop-car-city.entity";

@Table({
  tableName: 'cars',
})
export class Car extends Model<Car> {
  @AutoIncrement
  @PrimaryKey
  @Column({ primaryKey: true })
  id!: number;

  @ForeignKey(() => CarType)
  @Column
  car_type_id!: number;
  @BelongsTo(() => CarType)
  type!: CarType;

  @ForeignKey(() => CarCapacity)
  @Column
  car_capacity_id!: number;
  @BelongsTo(() => CarCapacity)
  capacity!: CarCapacity;

  @ForeignKey(() => CarSteering)
  @Column
  car_steering_id!: number;
  @BelongsTo(() => CarSteering)
  steering!: CarSteering;

  @ForeignKey(() => CarStatus)
  @Column
  car_status_id!: number;
  @BelongsTo(() => CarStatus)
  status!: CarStatus;

  @Column
  name!: string;

  @Column({
    type: DataType.INTEGER,
  })
  gasoline!: number;

  @Column(DataType.TEXT)
  description?: string;

  @Column({ allowNull: false })
  rental_price: number;

  @Column({ allowNull: false })
  original_price: number;

  @HasMany(() => CarImage)
  carImages: CarImage[];

  @HasMany(() => UserReviewCar)
  userReviewCars: UserReviewCar[];

  @HasMany(() => PickCarCity)
  pickCarCities: PickCarCity[];

  @HasMany(() => DropCarCity)
  dropCarCities: DropCarCity[];

  @HasMany(() => Order)
  orders: Order[];
}
