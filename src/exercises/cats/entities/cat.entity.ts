import { AppEntityOrm } from 'src/core/base/entity/app.entity.typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat extends AppEntityOrm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
