import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "offices"
})
export class Office extends Model<Office> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  city!: string;

  @Column(DataType.STRING)
  address!: string;

  @Column(DataType.GEOMETRY("POINT"))
  coordinate!: {
    type: string;
    coordinates: number[];
  };
}