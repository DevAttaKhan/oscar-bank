import { UserStatus, UserType } from '@/common/constants/common.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Group } from './group.entity';
import { Customer } from './customer.entity';
import { Employee } from './employee.entity';
import { Card } from './card.entity';
import * as bc from 'bcrypt';

@Entity('users') // Specifies the table name 'users'
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ length: 50, unique: true })
  phone: string;

  @Column({ type: 'enum', enum: UserType, nullable: true, default: UserType.ADMIN })
  userType: UserType;

  @Column({ length: 255 })
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column({ length: 20 })
  cnic: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: 'Active',
  })
  status: UserStatus;

  @Column({ length: 255, nullable: true })
  profileImageUrl: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ default: false })
  isPhoneVerified: boolean;

  @Column({ default: false })
  twoFactorEnabled: boolean;

  @Column({ type: 'json', nullable: true })
  securityQuestions: object;

  @Column({ length: 10, default: 'en' })
  preferredLanguage: string;

  @Column({ length: 100, nullable: true })
  timezone: string;

  @Column({ nullable: true })
  lastPasswordChange: Date;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ default: 0 })
  failedLoginAttempts: number;

  @Column({ nullable: true })
  lockedUntil: Date;

  @Column({ nullable: true })
  userGroupId: number; // Foreign key, assume you'll create a relationship later

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Column({ nullable: true })
  lastLogin: Date;

  @ManyToMany(() => Group, (group) => group.users, { nullable: true })
  @JoinTable({ name: 'user_groups' })
  groups: Group[];

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  customer: Customer;

  @OneToOne(() => Employee, (employee) => employee.user, { nullable: true })
  employee: Employee;

  @OneToMany(() => Card, (card) => card.cardHolder, { nullable: true })
  cards: Card[];

  @BeforeInsert()
  async hashPassword() {
    if (!this.password) return;
    this.password = await bc.hash(this.password, 10);
  }
}
