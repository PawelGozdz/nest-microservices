import { IUserFindOneCommand } from '@app/microservices';

export class UserFindOneCommand extends IUserFindOneCommand {
  constructor({ id, departmentId }: { id: string; departmentId: string }) {
    super({
      id,
      departmentId,
    });
  }
}
