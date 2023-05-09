import { IUserUpdateCommand } from '@app/microservices';

export abstract class IUserUpdateHandler {
  abstract execute(command: IUserUpdateCommand): Promise<void>;
}
