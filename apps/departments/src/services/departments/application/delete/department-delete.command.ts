import { IDepartmentDeleteCommand } from '@app/microservices';

export class DepartmentDeleteCommand extends IDepartmentDeleteCommand {
  constructor({ id }: { id: string }) {
    super({
      id,
    });
  }
}
