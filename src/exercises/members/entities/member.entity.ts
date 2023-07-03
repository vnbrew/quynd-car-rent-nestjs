import { Exclude } from 'class-transformer';
import { AppEntityOrm } from 'src/core/base/entity/app.entity.typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Member extends AppEntityOrm {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  gender: string;

  @Column()
  age: number;

  @Column({ default: '', nullable: false })
  address: string;
}
