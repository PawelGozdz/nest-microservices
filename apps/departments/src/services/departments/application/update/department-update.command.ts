import { IDepartmentUpdateCommand } from '@app/microservices';

export class DepartmentUpdateCommand extends IDepartmentUpdateCommand {
  constructor({ id, name }: { id: string; name: string }) {
    super({
      id,
      name,
    });
  }
}
