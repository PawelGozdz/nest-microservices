import { UsersCommandPatternEnum } from '../../enums';

interface User {
  id: string;
}

export abstract class IUserDeleteCommand<T extends User = User> {
  protected type: UsersCommandPatternEnum.USER_DELETE;

  public id: string;

  constructor({ id }: T) {
    this.id = id;
  }
}
