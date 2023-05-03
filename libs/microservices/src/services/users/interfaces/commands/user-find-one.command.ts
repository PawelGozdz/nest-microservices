import { UsersCommandPatternEnum } from '../../enums';

interface User {
  id: string;
}

export abstract class IUserFindOneCommand<T extends User = User> {
  protected type: UsersCommandPatternEnum.USER_FIND_ONE;

  public id: string;

  constructor({ id }: T) {
    this.id = id;
  }
}
