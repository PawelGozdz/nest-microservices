import { IUser } from '@app/ddd';
import { UsersEventPatternEnum } from '../../enums';

export abstract class IUserUpdatedEvent {
  static type: UsersEventPatternEnum.USER_UPDATED;

  public id: string;
  public departmentId: string;
  public email: string;
  public username: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor({ email, username, id, createdAt, updatedAt, departmentId }: IUser) {
    this.email = email;
    this.username = username;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.id = id;
    this.departmentId = departmentId;
  }
}
