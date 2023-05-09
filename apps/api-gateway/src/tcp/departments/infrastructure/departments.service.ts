import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IDepartmentsService } from '../domain/departments-service.interface';
import {
  DepartmentCreateCommand,
  DepartmentDeleteCommand,
  DepartmentFindManyCommand,
  DepartmentFindOneCommand,
  DepartmentUpdateCommand,
} from '../application';
import { IDepartment } from '@app/ddd';
import {
  IDepartmentCreateHandler,
  IDepartmentDeleteHandler,
  IDepartmentFindManyHandler,
  IDepartmentFindOneHandler,
  IDepartmentUpdateHandler,
} from '../domain';

@Injectable()
export class DepartmentsService implements IDepartmentsService {
  constructor(
    private readonly departmentCreateHandler: IDepartmentCreateHandler,
    private readonly departmentDeleteHandler: IDepartmentDeleteHandler,
    private readonly departmentUpdateHandler: IDepartmentUpdateHandler,
    private readonly departmentFindOneHandler: IDepartmentFindOneHandler,
    private readonly departmentFindManyHandler: IDepartmentFindManyHandler,
  ) {}

  create(command: DepartmentCreateCommand): Observable<{ id: string }> {
    return this.departmentCreateHandler.execute(command);
  }

  findMany(command: DepartmentFindManyCommand): Observable<Array<IDepartment>> {
    return this.departmentFindManyHandler.execute(command);
  }

  findOne(command: DepartmentFindOneCommand): Observable<IDepartment> {
    return this.departmentFindOneHandler.execute(command);
  }

  update(command: DepartmentUpdateCommand): Observable<void> {
    return this.departmentUpdateHandler.execute(command);
  }

  delete(command: DepartmentDeleteCommand): Observable<void> {
    return this.departmentDeleteHandler.execute(command);
  }
}
