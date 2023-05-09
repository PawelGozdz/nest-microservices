import { IUser } from '@app/ddd';
import { IUserCreatedEvent } from '@app/microservices';

export class UserCreatedEvent extends IUserCreatedEvent {
  constructor({ id, departmentId }: Pick<IUser, 'id' | 'departmentId'>) {
    super({
      id,
      departmentId,
    });
  }
}
