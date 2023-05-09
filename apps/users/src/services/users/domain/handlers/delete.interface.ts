import { IUserDeleteCommand } from '@app/microservices';

export abstract class IUserDeleteHandler {
  abstract execute(command: IUserDeleteCommand): Promise<void>;
}
