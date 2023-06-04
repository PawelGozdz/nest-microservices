import { IDepartmentDeleteCommand } from '@app/microservices';
import { Observable } from 'rxjs';

export abstract class IDepartmentDeleteHandler {
  abstract execute(command: IDepartmentDeleteCommand): Observable<void>;
}
