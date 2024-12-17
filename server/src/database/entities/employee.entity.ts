import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { EmploymentStatus, EmploymentType, PerformanceRating } from '@/common/constants/common.enum';
import { Designation } from './designation.entity';
import { Branch } from './branch.entity';
import { Transaction } from './transaction.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true })
  employeeCode: string;

  @Column({
    type: 'enum',
    enum: EmploymentStatus,
    default: EmploymentStatus.ACTIVE,
  })
  employmentStatus: EmploymentStatus;

  @Column({
    type: 'enum',
    enum: EmploymentType,
    default: EmploymentType.FULL_TIME,
  })
  employmentType: EmploymentType;

  @Column({
    type: 'enum',
    enum: PerformanceRating,
    nullable: true,
  })
  performanceRating: PerformanceRating;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'supervisorId' })
  supervisor: Employee;

  @Column({ nullable: true })
  dateOfJoining: Date;

  @Column({ nullable: true })
  salary: number;

  @Column({ nullable: true })
  bonus: number;

  @OneToOne(() => User, (user) => user.employee)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Designation, (designation) => designation.employee, { onDelete: 'CASCADE' })
  @JoinColumn()
  designation: Designation;

  @OneToMany(() => Branch, (branch) => branch.manager)
  branchesManaged: Branch[];

  @ManyToOne(() => Branch)
  @JoinColumn()
  assignedBranch: Branch;

  @OneToMany(() => Transaction, (transaction) => transaction.teller)
  transactions: Transaction[];
}
