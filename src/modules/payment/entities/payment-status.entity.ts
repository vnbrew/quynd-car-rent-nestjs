import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "payment_statuses"
})
export class PaymentStatus extends Model<PaymentStatus> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @Column({
    type: DataType.STRING(30),
    allowNull: false
  })
  status: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    defaultValue: ""
  })
  description: string;
}
