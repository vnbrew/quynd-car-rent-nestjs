export abstract class AbsGenericRepository<T> {
  abstract findAll(): Promise<T[]>;
  abstract findOneUseQuery(tableName: string, key: string, id: string): Promise<T | null>;
  abstract findOne(id: number): Promise<T | null>;
  abstract create(item: T): T;
  abstract createOrUpdate(item: T): Promise<T>;
  abstract remove(item: T): Promise<T>;

}
