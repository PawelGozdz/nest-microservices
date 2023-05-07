import { UsersCommandPatternEnum } from '../../enums';

interface User {
  email?: string;
  username?: string;
  departmentId: string;
  updatedDepartmentId?: string;
  id: string;
}

export abstract class IUserUpdateCommand<T extends User = User> {
  static type: UsersCommandPatternEnum.USER_UPDATE;

  public email?: string;
  public username?: string;
  public updatedDepartmentId?: string;
  public departmentId: string;
  public id: string;

  constructor({ email, username, id, departmentId, updatedDepartmentId }: T) {
    this.email = email;
    this.username = username;
    this.id = id;
    this.departmentId = departmentId;
    this.updatedDepartmentId = updatedDepartmentId;
  }
}
