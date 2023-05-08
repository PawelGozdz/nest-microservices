import { IDepartment } from '@app/ddd';

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
  abstract create(dto: DepartmentCreate): Promise<{ id: string }>;
  abstract update(dto: DepartmentUpdate): Promise<void>;
  abstract delete(id: Id): Promise<void>;
  abstract findOne(id: Id): Promise<IDepartment>;
  abstract findMany(dto: any): Promise<Array<IDepartment>>;
}
