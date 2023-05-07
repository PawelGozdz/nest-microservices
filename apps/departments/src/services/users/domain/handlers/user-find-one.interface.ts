import { IUser } from '@app/ddd';
import { IUserFindOneCommand } from '@app/microservices';

export abstract class IUserFindOneHandler {
  abstract findOne(command: IUserFindOneCommand): () => Promise<IUser>;
}
