import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IDepartmentsService } from '../domain/departments-service.interface';
import {
  DepartmentCreateCommand,
  DepartmentCreateHandler,
  DepartmentDeleteCommand,
  DepartmentDeleteHandler,
  DepartmentFindManyCommand,
  DepartmentFindManyHandler,
  DepartmentFindOneCommand,
  DepartmentFindOneHandler,
  DepartmentUpdateCommand,
  DepartmentUpdateHandler,
} from '../application';
import { IDepartment } from '@app/ddd';

@Injectable()
export class DepartmentsService implements IDepartmentsService {
  constructor(
    @Inject(DepartmentCreateHandler)
    private readonly departmentCreateHandler: DepartmentCreateHandler,
    @Inject(DepartmentDeleteHandler)
    private readonly departmentDeleteHandler: DepartmentDeleteHandler,
    @Inject(DepartmentUpdateHandler)
    private readonly departmentUpdateHandler: DepartmentUpdateHandler,
    @Inject(DepartmentFindOneHandler)
    private readonly departmentFindOneHandler: DepartmentFindOneHandler,
    @Inject(DepartmentFindManyHandler)
    private readonly departmentFindManyHandler: DepartmentFindManyHandler,
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
