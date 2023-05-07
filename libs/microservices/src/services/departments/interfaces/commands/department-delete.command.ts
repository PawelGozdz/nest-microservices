import { DepartmentsCommandPatternEnum } from '../../enums';

interface Department {
  id: string;
}

export abstract class IDepartmentDeleteCommand<T extends Department = Department> {
  static type: DepartmentsCommandPatternEnum.DEPARTMENT_DELETE;

  public id: string;

  constructor({ id }: T) {
    this.id = id;
  }
}
