import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Permission } from './permission.entity';

@Entity({ name: 'groups' })
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => User, (user) => user.groups)
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.groups)
  @JoinTable({ name: 'group_permissions' })
  permissions: Permission[];
}
