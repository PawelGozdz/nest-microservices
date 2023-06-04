import { IDepartmentFindOneCommand } from '@app/microservices';

export class DepartmentFindOneCommand extends IDepartmentFindOneCommand {
  constructor({ id }: { id: string }) {
    super({
      id,
    });
  }
}
