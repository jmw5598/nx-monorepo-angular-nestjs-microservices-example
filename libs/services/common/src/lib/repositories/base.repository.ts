import { 
  DeepPartial, 
  FindManyOptions, 
  FindOneOptions, 
  FindOptionsWhere, 
  Repository } from 'typeorm';

import { IRepository } from '../interfaces/repository.interface';

type EntityId = string | number;

interface HasId {
  id: EntityId;
}

export abstract class BaseRepository<T extends HasId, ID> implements IRepository<T, ID> {
  protected constructor(
    protected repository: Repository<T>
  ) { }

  public async save(data: DeepPartial<T>): Promise<T> {
    return await this.repository.save(data);
  }

  public async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return await this.repository.save(data);
  }

  public create(data: DeepPartial<T>): T {
    return this.repository.create(data);
  }

  public createMany(data: DeepPartial<T>[]): T[] {
    return this.repository.create(data);
  }

  public async findOneById(id: ID): Promise<T | null> {
    const options: FindOptionsWhere<T> = { id: id } as FindOptionsWhere<T>;
    return await this.repository.findOneBy(options);
  }

  public async findByCondition(filterCondition: FindOneOptions<T>): Promise<T | null> {
    return await this.repository.findOne(filterCondition);
  }

  public async findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(relations);
  }

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  public async remove(data: T): Promise<T> {
    return await this.repository.remove(data);
  }
  
  public async preload(entityLike: DeepPartial<T>): Promise<T | null> {
    return await this.repository.preload(entityLike) || null;
  }
}
