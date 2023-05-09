import { IDepartmentCreateCommand } from '@app/microservices';

export class DepartmentCreateCommand extends IDepartmentCreateCommand {
  constructor({ name }: { name: string }) {
    super({
      name,
    });
  }
}
