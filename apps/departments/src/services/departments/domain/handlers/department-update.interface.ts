import { IDepartmentUpdateCommand } from '@app/microservices';

export abstract class IDepartmentUpdateHandler {
  abstract update(command: IDepartmentUpdateCommand): () => Promise<void>;
}
