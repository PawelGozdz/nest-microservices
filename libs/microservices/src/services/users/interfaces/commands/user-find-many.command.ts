import { UsersCommandPatternEnum } from '../../enums';

interface User {
  departmentId: string;
}

export abstract class IUserFindManyCommand<T extends User = User> {
  static type: UsersCommandPatternEnum.USER_FIND_MANY;

  public departmentId: string;

  constructor({ departmentId }: T) {
    this.departmentId = departmentId;
  }
}
