import { IUser } from '@app/ddd';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { DepartmentEntity } from './department.entity';

@Entity()
export class UserEntity implements IUser {
  @PrimaryColumn({ unique: true, type: 'uuid' })
  id: string;

  @Column({ type: 'uuid', nullable: false })
  departmentId: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()' })
  updatedAt: Date;

  @ManyToOne(() => DepartmentEntity, (department) => department.users)
  department: DepartmentEntity;
}
