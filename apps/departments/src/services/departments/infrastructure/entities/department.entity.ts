import { IDepartment } from '@app/ddd';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class DepartmentEntity implements IDepartment {
  @PrimaryColumn({ unique: true, type: 'uuid' })
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()' })
  updatedAt: Date;

  users: UserEntity[];

  // @OneToMany(() => DepartmentEntity, (department) => department.users)
  // users: UserEntity[];
}
