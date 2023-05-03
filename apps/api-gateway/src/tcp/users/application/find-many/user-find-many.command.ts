import { IUserFindManyCommand } from '@app/microservices';

export class UserFindManyCommand extends IUserFindManyCommand {
  constructor({ email, username }: { email?: string; username?: string }) {
    super({
      email,
      username,
    });
  }
}
