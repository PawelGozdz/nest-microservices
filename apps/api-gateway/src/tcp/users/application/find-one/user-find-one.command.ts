import { IUserFindOneCommand } from '@app/microservices';

export class UserFindOneCommand extends IUserFindOneCommand {
  constructor({ id }: { id: string }) {
    super({
      id,
    });
  }
}
