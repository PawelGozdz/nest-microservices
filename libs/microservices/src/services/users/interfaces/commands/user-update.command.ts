import { UsersCommandPatternEnum } from '../../enums';

interface User {
  email?: string;
  username?: string;
  id: string;
}

export abstract class IUserUpdateCommand<T extends User = User> {
  protected type: UsersCommandPatternEnum.USER_UPDATE;

  public email?: string;
  public username?: string;
  public id: string;

  constructor({ email, username, id }: T) {
    this.email = email;
    this.username = username;
    this.id = id;
  }
}
