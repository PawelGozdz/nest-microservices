import { UsersCommandPatternEnum } from '../../enums';

interface User {
  id: string;
  departmentId: string;
}

export abstract class IUserFindOneCommand<T extends User = User> {
  static type: UsersCommandPatternEnum.USER_FIND_ONE;

  public id: string;
  public departmentId: string;

  constructor({ id, departmentId }: T) {
    this.id = id;
    this.departmentId = departmentId;
  }
}
