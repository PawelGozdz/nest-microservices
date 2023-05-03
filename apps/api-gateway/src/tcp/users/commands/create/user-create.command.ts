import { IUserCreateCommand } from '@app/microservices';

export class UserCreateCommand extends IUserCreateCommand {
  constructor({ email, username }: { email: string; username: string }) {
    super({
      email,
      username,
    });
  }
}
