import { IDepartmentDeleteCommand } from '@app/microservices';

export abstract class IDepartmentDeleteHandler {
  abstract delete(command: IDepartmentDeleteCommand): () => Promise<void>;
}
