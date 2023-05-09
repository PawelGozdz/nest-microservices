import { IDepartmentUpdateCommand } from '@app/microservices';

export abstract class IDepartmentUpdateHandler {
  abstract execute(command: IDepartmentUpdateCommand): Promise<void>;
}
