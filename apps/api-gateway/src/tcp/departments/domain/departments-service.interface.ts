import { IDepartment } from '@app/ddd';
import { Observable } from 'rxjs';

interface Id {
  id: string;
}

interface DepartmentCreate {
  name: string;
}

interface DepartmentUpdate {
  id: string;
  name: string;
}

export abstract class IDepartmentsService {
  abstract create(dto: DepartmentCreate): Observable<{ id: string }>;
  abstract update(dto: DepartmentUpdate): Observable<any>;
  abstract delete(id: Id): Observable<void>;
  abstract findOne(id: Id): Observable<IDepartment>;
  abstract findMany(dto: any): Observable<Array<IDepartment>>;
}
