import { IUserCreateCommand } from '@app/microservices';

export class UserCreateCommand extends IUserCreateCommand {
  constructor({
    email,
    username,
    departmentId,
  }: {
    email: string;
    username: string;
    departmentId: string;
  }) {
    super({
      email,
      username,
      departmentId,
    });
  }
}
