import { DepartmentsCommandPatternEnum } from '../../enums';

interface Department {
  name: string;
}

export abstract class IDepartmentCreateCommand<T extends Department = Department> {
  static type: DepartmentsCommandPatternEnum.DEPARTMENT_CREATE;

  public name: string;

  constructor({ name }: T) {
    this.name = name;
  }
}
