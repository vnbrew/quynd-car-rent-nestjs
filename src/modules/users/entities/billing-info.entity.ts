import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Index,
  IsEmail,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Role } from '../../../common/enum/role';
import { TableName } from '../../../common/enum/table';
import { UserToken } from './user-token.entity';
import { User } from './user.entity';

@Table({
  tableName: 'billing_info',
})
export class BillingInfo extends Model<BillingInfo> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Unique
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  user_id: number;

  @Index
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(100),
    defaultValue: '',
  })
  city: string;

  @Column({
    type: DataType.STRING(100),
    defaultValue: '',
  })
  address: string;

  @Column({
    type: DataType.STRING(30),
    defaultValue: '',
  })
  phone_number: string;
}
