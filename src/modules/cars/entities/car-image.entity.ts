import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Car } from './car.entity';

@Table({
  tableName: 'car_images',
})
export class CarImage extends Model<CarImage> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Car)
  @Column({ allowNull: false })
  car_id: number;

  @Column({ allowNull: true })
  image_url?: string;

  @BelongsTo(() => Car)
  car!: Car;
}
