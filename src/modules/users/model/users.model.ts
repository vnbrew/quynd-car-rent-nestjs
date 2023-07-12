import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "users"
})
class Users extends Model<Users> {
  @Column({
    type: DataType.ENUM("Admin", "Customer"),
    allowNull: false,
    defaultValue: "Customer"
  })
  role: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true
  })
  email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  password: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  name: string;

  @Column({
    type: DataType.STRING(100),
    defaultValue: ""
  })
  city: string;

  @Column({
    type: DataType.STRING(100),
    defaultValue: ""
  })
  address: string;

  @Column({
    type: DataType.STRING(30),
    defaultValue: ""
  })
  phone_number: string;

  @Column({
    type: DataType.STRING(100),
    defaultValue: ""
  })
  image_url: string;
}