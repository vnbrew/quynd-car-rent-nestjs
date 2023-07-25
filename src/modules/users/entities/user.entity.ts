import {
  BelongsToMany,
  Column,
  DataType,
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

@Table({
  tableName: TableName.users,
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.ENUM(Role.admin, Role.user),
    allowNull: false,
    defaultValue: Role.user,
  })
  role: string;

  @Unique
  @IsEmail
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password: string;

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

  @Column({
    type: DataType.STRING(100),
    defaultValue: '',
  })
  image_url: string;

  @HasOne(() => UserToken)
  user_token: UserToken;
}
