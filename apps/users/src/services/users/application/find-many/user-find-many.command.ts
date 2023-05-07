import { IUserFindManyCommand } from '@app/microservices';

export class UserFindManyCommand extends IUserFindManyCommand {
  constructor({ departmentId }: { departmentId: string }) {
    super({
      departmentId,
    });
  }
}
