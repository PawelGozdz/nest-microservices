import { IDepartmentDeleteCommand } from '@app/microservices';

export abstract class IDepartmentDeleteHandler {
  abstract execute(command: IDepartmentDeleteCommand): Promise<void>;
}
