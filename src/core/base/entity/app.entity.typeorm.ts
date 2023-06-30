import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AppEntityOrm extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
