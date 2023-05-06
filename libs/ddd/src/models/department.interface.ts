import { IUser } from './user.interface';

export class IDepartment {
  id: string;
  name: string;
  users: IUser[];
  createdAt: Date;
  updatedAt: Date;
}
