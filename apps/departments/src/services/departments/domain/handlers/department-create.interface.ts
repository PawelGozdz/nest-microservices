import { IDepartmentCreateCommand } from '@app/microservices';

export abstract class IDepartmentCreateHandler {
  abstract create(command: IDepartmentCreateCommand): () => Promise<{ id: string }>;
}
