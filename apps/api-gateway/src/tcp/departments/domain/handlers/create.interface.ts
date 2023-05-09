import { IDepartmentCreateCommand } from '@app/microservices';
import { Observable } from 'rxjs';

export abstract class IDepartmentCreateHandler {
  abstract execute(command: IDepartmentCreateCommand): Observable<{ id: string }>;
}
