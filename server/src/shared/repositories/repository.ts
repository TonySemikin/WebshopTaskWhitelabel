export interface Repository<T> {
  save(entity: T): Promise<T>;
  loadById(_id: string): Promise<T>;
}
