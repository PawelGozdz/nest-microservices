import { IUser } from '@app/ddd';
import { UsersEventPatternEnum } from '../../enums';

export abstract class IUserCreatedEvent {
  static type: UsersEventPatternEnum.USER_CREATED;

  public id: string;
  public departmentId: string;

  constructor({ id, departmentId }: Pick<IUser, 'id' | 'departmentId'>) {
    this.id = id;
    this.departmentId = departmentId;
  }
}
