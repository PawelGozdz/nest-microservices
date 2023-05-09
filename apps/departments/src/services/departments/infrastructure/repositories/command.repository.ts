import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IDepartmentsCommandRepository } from '../../domain';
import { DepartmentEntity } from '../entities';
import { FindOneOptions, Repository } from 'typeorm';
import { IDepartment } from '@app/ddd';

@Injectable()
export class DepartmentsCommandRepository implements IDepartmentsCommandRepository {
  constructor(
    @InjectRepository(DepartmentEntity)
    private departmentssRepository: Repository<DepartmentEntity>,
  ) {}

  async findOne(query: FindOneOptions<DepartmentEntity>) {
    const department = await this.departmentssRepository.findOne(query);

    if (!department) {
      return;
    }

    return this.mapResponse(department);
  }

  async save(department: IDepartment): Promise<DepartmentEntity> {
    const createDepartment = this.departmentssRepository.create(department);

    await this.departmentssRepository.save(createDepartment);

    return this.mapResponse(createDepartment);
  }

  async update(id: string, department: IDepartment): Promise<void> {
    await this.departmentssRepository.update(
      {
        id,
      },
      department,
    );

    return;
  }

  async delete(id: string): Promise<void> {
    await this.departmentssRepository.delete({
      id,
    });

    return;
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
