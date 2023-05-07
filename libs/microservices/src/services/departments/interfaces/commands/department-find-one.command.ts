import { DepartmentsCommandPatternEnum } from '../../enums';

interface Department {
  id: string;
}

export abstract class IDepartmentFindOneCommand<T extends Department = Department> {
  static type: DepartmentsCommandPatternEnum.DEPARTMENT_FIND_ONE;

  public id: string;

  constructor({ id }: T) {
    this.id = id;
  }
}
