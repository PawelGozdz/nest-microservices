import { IUserUpdateCommand } from '@app/microservices';

export class UserUpdateCommand extends IUserUpdateCommand {
  constructor({
    email,
    username,
    id,
    departmentId,
    updatedDepartmentId,
  }: {
    id: string;
    email?: string;
    username?: string;
    departmentId: string;
    updatedDepartmentId?: string;
  }) {
    super({
      id,
      email,
      username,
      departmentId,
      updatedDepartmentId,
    });
  }
}
