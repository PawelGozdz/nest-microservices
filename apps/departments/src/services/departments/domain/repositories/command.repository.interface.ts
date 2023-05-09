import { IDepartment } from '@app/ddd';

export abstract class IDepartmentsCommandRepository {
  abstract findOne(query: any): Promise<IDepartment | undefined>;
  abstract save(department: IDepartment): Promise<IDepartment>;
  abstract update(id: string, department: IDepartment): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
