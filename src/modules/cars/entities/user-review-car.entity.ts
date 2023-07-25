import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { Car } from './car.entity';
import { User } from '../../users/entities/user.entity';
import { Exclude } from 'class-transformer';

@Table({
  tableName: 'reviews',
})
export class UserReviewCar extends Model<UserReviewCar> {
  @ForeignKey(() => Car)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  car_id!: number;

  @BelongsTo(() => Car)
  car!: Car;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rate!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  comment!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updated_at: Date;
}
