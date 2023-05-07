import { IUser } from '@app/ddd';
import { IUserDeletedEvent } from '@app/microservices';

export class UserDeletedEvent extends IUserDeletedEvent {
  constructor({ id, departmentId }: Pick<IUser, 'id' | 'departmentId'>) {
    super({
      id,
      departmentId,
    });
  }
}
