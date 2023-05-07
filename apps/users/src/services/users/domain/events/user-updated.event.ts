import { IUser } from '@app/ddd';
import { IUserUpdatedEvent } from '@app/microservices';

export class UserUpdatedEvent extends IUserUpdatedEvent {
  constructor({ email, username, createdAt, id, updatedAt, departmentId }: IUser) {
    super({
      id,
      departmentId,
      email,
      username,
      updatedAt,
      createdAt,
    });
  }
}
