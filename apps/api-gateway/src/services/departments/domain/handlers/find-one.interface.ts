import { IDepartment } from '@app/ddd';
import { IDepartmentFindOneCommand } from '@app/microservices';
import { Observable } from 'rxjs';

export abstract class IDepartmentFindOneHandler {
  abstract execute(command: IDepartmentFindOneCommand): Observable<IDepartment>;
}
