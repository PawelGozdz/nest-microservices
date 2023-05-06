import { IUserUpdateCommand } from '@app/microservices';
import { Observable } from 'rxjs';

export abstract class IUserUpdateHandler {
  abstract update(command: IUserUpdateCommand): () => Promise<void>;
}
