import { IUserCreateCommand } from '@app/microservices';

export abstract class IUserCreateHandler {
  abstract execute(command: IUserCreateCommand): Promise<{ id: string }>;
}
