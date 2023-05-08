import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IDepartmentsQueryRepository } from '../../domain';
import { DepartmentEntity } from '../entities';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class DepartmentsQueryRepository implements IDepartmentsQueryRepository {
  constructor(
    @InjectRepository(DepartmentEntity)
    private departmentsRepository: Repository<DepartmentEntity>,
  ) {}

  async findOne(query: FindOneOptions<DepartmentEntity>) {
    const department = await this.departmentsRepository.findOne(query);

    if (!department) {
      return;
    }

    return this.mapResponse(department);
  }

  async findMany(query?: FindManyOptions<DepartmentEntity>) {
    const departments = await this.departmentsRepository.find(query);

    return departments.map((u) => this.mapResponse(u));
  }

  mapResponse(department: DepartmentEntity): DepartmentEntity {
    return {
      id: department.id,
      name: department.name,
      users: department.users,
      createdAt: department.createdAt,
      updatedAt: department.updatedAt,
    };
  }
}
