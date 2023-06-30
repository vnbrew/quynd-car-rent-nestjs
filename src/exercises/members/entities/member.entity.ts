import { Exclude } from 'class-transformer';
import { AppEntityOrm } from 'src/core/base/entity/app.entity.typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Member extends AppEntityOrm {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ unique: true })
  gender: string;
}
