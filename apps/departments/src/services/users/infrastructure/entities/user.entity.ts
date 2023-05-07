import { IUser } from '@app/ddd';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity implements IUser {
  @PrimaryColumn({ unique: true, type: 'uuid' })
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()' })
  updatedAt: Date;
}
