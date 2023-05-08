import { IUser } from '@app/ddd';
import { UsersEventPatternEnum } from '../../enums';

export abstract class IUserUpdatedEvent {
  static type: UsersEventPatternEnum.USER_UPDATED;

  public id: string;
  public departmentId: string;

  constructor({ id, departmentId }: Pick<IUser, 'id' | 'departmentId'>) {
    this.id = id;
    this.departmentId = departmentId;
  }
}
