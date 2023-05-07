import { IUser } from '@app/ddd';
import { IUserCreatedEvent } from '@app/microservices';

export class UserCreatedEvent extends IUserCreatedEvent {
  constructor({ email, username, createdAt, id, updatedAt }: IUser) {
    super({
      id,
      email,
      username,
      updatedAt,
      createdAt,
    });
  }
}
