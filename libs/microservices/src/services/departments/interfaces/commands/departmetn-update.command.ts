import { DepartmentsCommandPatternEnum } from '../../enums';

interface Department {
  name?: string;
  id: string;
}

export abstract class IDepartmentUpdateCommand<T extends Department = Department> {
  static type: DepartmentsCommandPatternEnum.DEPARTMENT_UPDATE;

  public name?: string;
  public id: string;

  constructor({ name, id }: T) {
    this.name = name;
    this.id = id;
  }
}
