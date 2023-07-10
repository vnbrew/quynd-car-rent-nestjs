import { Table, Column, Model, DataType, AutoIncrement } from "sequelize-typescript";

@Table
export class Member extends Model<Member> {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;
}
