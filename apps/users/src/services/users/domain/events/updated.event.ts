import { IUser } from '@app/ddd';
import { IUserUpdatedEvent } from '@app/microservices';

export class UserUpdatedEvent extends IUserUpdatedEvent {
  constructor({ id, departmentId }: Pick<IUser, 'id' | 'departmentId'>) {
    super({
      id,
      departmentId,
    });
  }
}
