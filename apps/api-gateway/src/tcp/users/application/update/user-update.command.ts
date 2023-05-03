import { IUserUpdateCommand } from '@app/microservices';

export class UserUpdateCommand extends IUserUpdateCommand {
  constructor({ email, username, id }: { id: string; email?: string; username?: string }) {
    super({
      id,
      email,
      username,
    });
  }
}
