import { IDepartment } from '@app/ddd';
import { IDepartmentFindManyCommand } from '@app/microservices';
import { Observable } from 'rxjs';

export abstract class IDepartmentFindManyHandler {
  abstract execute(command: IDepartmentFindManyCommand): Observable<Array<IDepartment>>;
}
