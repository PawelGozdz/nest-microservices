import { IDepartmentCreateCommand } from '@app/microservices';

export abstract class IDepartmentCreateHandler {
  abstract execute(command: IDepartmentCreateCommand): Promise<{ id: string }>;
}
