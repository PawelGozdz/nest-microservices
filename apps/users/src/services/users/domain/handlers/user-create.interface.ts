import { IUserCreateCommand } from '@app/microservices';

export abstract class IUserCreateHandler {
  abstract create(command: IUserCreateCommand): () => Promise<{ id: string }>;
}
