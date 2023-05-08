import { IDepartment } from '@app/ddd';

export abstract class IDepartmentsQueryRepository {
  abstract findMany(queryOptions?: any): Promise<IDepartment[]>;
  abstract findOne(query: any): Promise<IDepartment | undefined>;
}
