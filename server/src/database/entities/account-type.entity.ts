import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Account } from './account.entity';

@Entity('account_types')
export class AccountType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', scale: 2, default: 0.0 })
  interestRate: number;

  @Column({ type: 'decimal', scale: 2, default: 0.0 })
  minimumBalance: number;

  @Column({ type: 'decimal', scale: 2, default: 0.0 })
  overdraftLimit: number;

  @Column({ type: 'decimal', scale: 2, default: 0.0 })
  withdrawalLimitPerDay: number;

  @Column({ default: 50000 })
  transactionLimitPerDay: number;

  @Column({ length: 10, default: 'PKR' })
  currencyCode: string;

  @Column({ type: 'decimal', scale: 2, default: 0.0 })
  accountMaintenanceFee: number;

  @Column({ type: 'decimal', scale: 2, default: 0.0 })
  accountOpeningFee: number;

  @Column({ default: false })
  loanEligibility: boolean;

  @Column({ default: false })
  overdraftEligibility: boolean;

  @Column({ default: false })
  checkBookEligibility: boolean;

  @Column({ default: true })
  digitalBankingEligibility: boolean;

  @Column({ default: false })
  rewardsProgramEligibility: boolean;

  @Column({ default: false })
  insuranceEligibility: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Account, (account) => account.accountType)
  accounts: Account[];
}
