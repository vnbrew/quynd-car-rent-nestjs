import { BelongsTo, Column, DataType, ForeignKey, Model, Table, Unique } from "sequelize-typescript";
import { TableName } from "../../../shared/enum/table";
import { User } from "./user.entity";

@Table({
  tableName: TableName.user_tokens
})
export class UserToken extends Model<UserToken> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Unique
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ allowNull: false })
  token: string;

  @Column({ allowNull: false, type: DataType.DATE })
  expiration_time: Date;
}