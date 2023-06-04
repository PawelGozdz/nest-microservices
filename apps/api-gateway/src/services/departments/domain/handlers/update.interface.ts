import { IDepartmentUpdateCommand } from '@app/microservices';
import { Observable } from 'rxjs';

export abstract class IDepartmentUpdateHandler {
  abstract execute(command: IDepartmentUpdateCommand): Observable<void>;
}
