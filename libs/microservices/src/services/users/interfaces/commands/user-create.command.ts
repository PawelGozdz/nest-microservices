import { UsersCommandPatternEnum } from '../../enums';

interface User {
  email: string;
  username: string;
}

export abstract class IUserCreateCommand<T extends User = User> {
  protected type: UsersCommandPatternEnum.USER_CREATE;

  public email: string;
  public username: string;

  constructor({ email, username }: T) {
    this.email = email;
    this.username = username;
  }
}
