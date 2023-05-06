import { IUserDeleteCommand } from '@app/microservices';

export abstract class IUserDeleteHandler {
  abstract delete(command: IUserDeleteCommand): () => Promise<void>;
}
