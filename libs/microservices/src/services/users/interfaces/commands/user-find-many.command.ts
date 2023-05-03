import { UsersCommandPatternEnum } from '../../enums';

interface User {
  email?: string;
  username?: string;
}

export abstract class IUserFindManyCommand<T extends User = User> {
  protected type: UsersCommandPatternEnum.USER_FIND_MANY;

  public email?: string;
  public username?: string;

  constructor({ email, username }: T) {
    this.email = email;
    this.username = username;
  }
}
