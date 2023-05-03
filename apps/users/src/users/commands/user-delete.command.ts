import { IUserDeleteCommand } from '@app/microservices';

export class UserDeleteCommand extends IUserDeleteCommand {
  constructor({ id }: { id: string }) {
    super({
      id,
    });
  }
}
