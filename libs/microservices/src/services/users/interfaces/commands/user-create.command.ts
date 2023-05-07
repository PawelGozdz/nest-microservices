import { UsersCommandPatternEnum } from '../../enums';

interface User {
  email: string;
  username: string;
  departmentId: string;
}

export abstract class IUserCreateCommand<T extends User = User> {
  static type: UsersCommandPatternEnum.USER_CREATE;

  public email: string;
  public username: string;
  public departmentId: string;

  constructor({ email, username, departmentId }: T) {
    this.email = email;
    this.username = username;
    this.departmentId = departmentId;
  }
}
