import { AbsGenericRepository } from 'src/core/base/abstracts/generic.repository.abstract';
import { AppEntityOrm } from 'src/core/base/entity/app.entity.typeorm';
import {
  FindOptionsWhere,
  Repository,
} from 'typeorm';

export class MySQLGenericRepository<T extends AppEntityOrm>
  implements AbsGenericRepository<T>
{
  private _repository: Repository<T>;
  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  findAll(): Promise<T[]> {
    return this._repository.find();
  }

  findOneUseQuery(tableName: string, key: string, id: string): Promise<T> {
    const query = `SELECT * FROM ${tableName} WHERE ${key} = ${id} LIMIT 1`;
    return this._repository.query(query);
  }

  findOne(id: number): Promise<T> {
    const findOptionsWhere = { id: id } as FindOptionsWhere<T>;
    return this._repository.findOneBy(findOptionsWhere);
  }

  create(item: T): T {
    return this._repository.create(item);
  }

  createOrUpdate(item: T): Promise<T> {
    return this._repository.save(item);
  }

  remove(item: T): Promise<T> {
    return this._repository.remove(item);
  }
}
