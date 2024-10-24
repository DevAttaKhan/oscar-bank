import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Employee } from './employee.entity'; // Assuming Employee entity already exists
import { BranchStatus } from '@/common/constants/common.enum';
import { Account } from './account.entity';

@Entity('branches')
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  code: number;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  postalCode: number;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  numberOfEmployees: number;

  @Column({
    type: 'enum',
    enum: BranchStatus,
    default: BranchStatus.ACTIVE,
  })
  status: BranchStatus;

  @ManyToOne(() => Employee, (employee) => employee.branchesManaged)
  @JoinColumn()
  manager: Employee;

  @OneToMany(() => Employee, (employee) => employee.assignedBranch)
  employees: Employee[];

  @OneToMany(() => Account, (account) => account.branch)
  accounts: Account;

  @CreateDateColumn()
  createdAt: Date;
}
