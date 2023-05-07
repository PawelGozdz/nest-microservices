import { IUserDeleteCommand } from '@app/microservices';

export class UserDeleteCommand extends IUserDeleteCommand {
  constructor({ id, departmentId }: { id: string; departmentId: string }) {
    super({
      id,
      departmentId,
    });
  }
}
