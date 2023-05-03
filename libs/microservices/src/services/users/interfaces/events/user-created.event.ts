import { UsersEventPatternEnum } from '../../enums';

export abstract class IUserCreatedEvent {
  protected type: UsersEventPatternEnum.USER_CREATED;

  constructor(public readonly email: string, public readonly username: string) {}
}
