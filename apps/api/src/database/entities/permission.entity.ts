import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './group.entity';

@Entity({ name: 'permissions' })
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Group, (group) => group.permissions)
  groups: Group[];
}
