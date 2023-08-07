import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'payment_types',
})
export class PaymentType extends Model<PaymentType> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    defaultValue: '',
  })
  description: string;
}
