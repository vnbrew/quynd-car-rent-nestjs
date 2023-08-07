import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'coupon_types',
})
export class CouponType extends Model<CouponType> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string;
}
