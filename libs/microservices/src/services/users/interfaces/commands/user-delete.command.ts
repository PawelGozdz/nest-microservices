import { UsersCommandPatternEnum } from '../../enums';

interface User {
  id: string;
  departmentId: string;
}

export abstract class IUserDeleteCommand<T extends User = User> {
  static type: UsersCommandPatternEnum.USER_DELETE;

  public id: string;
  public departmentId: string;

  constructor({ id, departmentId }: T) {
    this.id = id;
    this.departmentId = departmentId;
  }
}
