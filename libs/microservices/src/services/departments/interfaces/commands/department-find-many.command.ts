import { DepartmentsCommandPatternEnum } from '../../enums';

interface Department {}

export abstract class IDepartmentFindManyCommand<T extends Department = Department> {
  static type: DepartmentsCommandPatternEnum.DEPARTMENT_FIND_MANY;

  constructor() {}
}
