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
import { Office } from './car-office.entity';
import { CarStatus } from './car-status.entity';
import { CarSteering } from './car-steering.entity';
import { CarType } from './car-type.entity';
import { CarCapacity } from './car-capacity.entity';
import { CarPrice } from './car-price.entity';
import { CarImage } from './car-image.entity';
import { UserReviewCar } from './user-review-car.entity';
import { Rental } from '../../rental/entities/rental.entity';
import { Order } from '../../orders/entities/order.entity';

@Table({
  tableName: 'cars',
})
export class Car extends Model<Car> {
  @AutoIncrement
  @PrimaryKey
  @Column({ primaryKey: true })
  id!: number;

  @ForeignKey(() => Office)
  @Column
  office_id!: number;

  @ForeignKey(() => CarType)
  @Column
  car_type_id!: number;

  @ForeignKey(() => CarCapacity)
  @Column
  car_capacity_id!: number;

  @ForeignKey(() => CarSteering)
  @Column
  car_steering_id!: number;

  @ForeignKey(() => CarStatus)
  @Column
  car_status_id!: number;

  @Column
  name!: string;

  @Column({
    type: DataType.INTEGER,
  })
  gasoline!: number;

  @Column(DataType.TEXT)
  description?: string;

  @BelongsTo(() => CarSteering)
  steering!: CarSteering;

  @BelongsTo(() => CarStatus)
  status!: CarStatus;

  @BelongsTo(() => Office)
  office!: Office;

  @BelongsTo(() => CarType)
  type!: CarType;

  @BelongsTo(() => CarCapacity)
  capacity!: CarCapacity;

  @HasOne(() => CarPrice)
  carPrice: CarPrice;

  @HasMany(() => CarImage)
  carImages: CarImage[];

  @HasMany(() => UserReviewCar)
  // users: Array<User & { UserReviewCar: UserReviewCar }>;
  userReviewCars: UserReviewCar[];

  @HasMany(() => Order)
  orders: Order[];
}
