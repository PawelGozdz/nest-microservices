import { IUser } from '@app/ddd';
import { IUserDeletedEvent } from '@app/microservices';

export class UserDeletedEvent extends IUserDeletedEvent {
  constructor({ id }: Pick<IUser, 'id'>) {
    super({
      id,
    });
  }
}
