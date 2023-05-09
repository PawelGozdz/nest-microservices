import { Injectable } from '@nestjs/common';
import {
  DepartmentCreateCommand,
  DepartmentDeleteCommand,
  DepartmentFindManyCommand,
  DepartmentFindOneCommand,
  DepartmentUpdateCommand,
} from '../application';
import {
  IDepartmentCreateHandler,
  IDepartmentUpdateHandler,
  IDepartmentDeleteHandler,
  IDepartmentFindOneHandler,
  IDepartmentFindManyHandler,
} from '../domain';

@Injectable()
export class DepartmentsService {
  constructor(
    private readonly departmentCreateHandler: IDepartmentCreateHandler,
    private readonly departmentUpdateHandler: IDepartmentUpdateHandler,
    private readonly departmentDeleteHandler: IDepartmentDeleteHandler,
    private readonly departmentFindOneHandler: IDepartmentFindOneHandler,
    private readonly departmentFindManyHandler: IDepartmentFindManyHandler,
  ) {}
  create(command: DepartmentCreateCommand) {
    return this.departmentCreateHandler.execute(command);
  }

  findMany(command: DepartmentFindManyCommand) {
    return this.departmentFindManyHandler.execute(command);
  }

  findOne(command: DepartmentFindOneCommand) {
    return this.departmentFindOneHandler.execute(command);
  }

  update(command: DepartmentUpdateCommand) {
    return this.departmentUpdateHandler.execute(command);
  }

  delete(command: DepartmentDeleteCommand) {
    return this.departmentDeleteHandler.execute(command);
  }
}
