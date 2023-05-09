import { IDepartment } from '@app/ddd';
import { IDepartmentFindOneCommand } from '@app/microservices';

export abstract class IDepartmentFindOneHandler {
  abstract execute(command: IDepartmentFindOneCommand): Promise<IDepartment>;
}
