import { IUser } from '@app/ddd';
import { IUserFindManyCommand } from '@app/microservices';

export abstract class IUserFindManyHandler {
  abstract findMany(command: IUserFindManyCommand): () => Promise<Array<IUser>>;
}
