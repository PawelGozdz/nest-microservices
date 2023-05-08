import { IDepartment } from '@app/ddd';
import { IDepartmentFindManyCommand } from '@app/microservices';

export abstract class IDepartmentFindManyHandler {
  abstract findMany(command: IDepartmentFindManyCommand): () => Promise<Array<IDepartment>>;
}
