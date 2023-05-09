import { IUser } from '@app/ddd';
import { IUserFindOneCommand } from '@app/microservices';

export abstract class IUserFindOneHandler {
  abstract execute(command: IUserFindOneCommand): Promise<IUser>;
}
