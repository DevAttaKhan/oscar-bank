import { UserStatus, UserType } from '@/common/constants/common.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('users') // Specifies the table name 'users'
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ length: 50, unique: true })
  phone: string;

  @Column({ type: 'enum', enum: UserType })
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

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Column({ nullable: true })
  lastLogin: Date;
}
