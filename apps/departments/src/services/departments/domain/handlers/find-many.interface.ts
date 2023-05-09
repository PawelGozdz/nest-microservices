import { IDepartment } from '@app/ddd';
import { IDepartmentFindManyCommand } from '@app/microservices';

export abstract class IDepartmentFindManyHandler {
  abstract execute(command: IDepartmentFindManyCommand): Promise<Array<IDepartment>>;
}
