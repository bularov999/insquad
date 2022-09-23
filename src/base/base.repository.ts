import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  Entity,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

export abstract class BaseRepository<Entity> {
  protected constructor( private repository: Repository<Entity | any>) {
  }
  async create(data): Promise<Entity> {
    const instance = this.repository.create(data);
    return this.repository.save(instance);
  }

  async find(query: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repository.find(query);
  }
  async getAll() {
    return this.repository.find();
  }
  async findBy(query: FindOptionsWhere<Entity>): Promise<Entity[]> {
    return this.repository.findBy(query);
  }

  async findOne(query: FindOneOptions<Entity>): Promise<Entity> {
    return this.repository.findOne(query);
  }

  async findOneBy(query: FindOptionsWhere<Entity>): Promise<Entity> {
    return this.repository.findOneBy(query);
  }

  async findAndCount(
    query: FindManyOptions<Entity>,
  ): Promise<[Entity[], number]> {
    return this.repository.findAndCount(query);
  }

  async updateOne(id: number, data: Entity): Promise<Entity> {
    const instance = await this.repository.findOneBy({
      id,
    });
    if (!instance)
      throw new HttpException(
        `instance by ${id} not found`,
        HttpStatus.FORBIDDEN,
      );
    return this.repository.save({
      ...instance,
      ...data,
    });
  }

  async deleteOne(id): Promise<DeleteResult> {
    return await this.repository.delete({ id });
  }
}
