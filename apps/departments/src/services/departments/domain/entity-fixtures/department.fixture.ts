import { IDepartment } from '@app/ddd';
import { EntityId } from '../../../../core/value-objects';

export class DepartmentFixture implements IDepartment {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create({
    id,
    name,
    createdAt,
    updatedAt,
  }: {
    id?: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): IDepartment {
    const department = new DepartmentFixture(
      id ? EntityId.create(id).value : EntityId.createRandom().value,
      name,
      createdAt,
      updatedAt,
    );

    return department;
  }
}
