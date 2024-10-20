import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Customer } from './customer.entity';
import { Branch } from './branch.entity';
import { AccountStatus } from '@/common/constants/common.enum';
import { AccountType } from './account-type.entity';
import { Transaction } from './transaction.entity';
// import { AccountTypes } from './accountTypes.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  accountNumber: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0.0 })
  balance: number;

  @ManyToOne(() => AccountType, (accType) => accType.accounts)
  @JoinColumn()
  accountType: AccountType;

  @ManyToOne(() => Branch, (branch) => branch.accounts)
  @JoinColumn()
  branch: Branch;

  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.ACTIVE,
  })
  accountStatus: AccountStatus;

  @Column({ nullable: true })
  lastTransactionDate: Date;

  @CreateDateColumn()
  accountOpeningDate: Date;

  @Column({ nullable: true })
  accountClosingDate: Date;

  @Column({ default: 0.0 })
  fees: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.fromAccount)
  fromTransactions: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.fromAccount)
  toTransactions: Transaction[];
}
