import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from './account.entity';
import { Employee } from './employee.entity';
import { TransactionType } from './transaction-type.entity';
import { TransactionsPurpose } from './transaction-purpose.entity';
import { TransactionStatus } from '@/common/constants/common.enum';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, { nullable: false })
  @JoinColumn()
  account: Account;

  @Column({ scale: 2, nullable: false })
  amount: number;

  @ManyToOne(() => TransactionType, (transactionType) => transactionType.transactions, { nullable: false })
  @JoinColumn()
  transactionType: TransactionType;

  @ManyToOne(() => Account, (account) => account.fromTransactions, { nullable: true })
  @JoinColumn()
  fromAccount?: Account;

  @ManyToOne(() => Account, (account) => account.toTransactions, { nullable: true })
  @JoinColumn()
  toAccount?: Account;

  @ManyToOne(() => Employee, { nullable: false })
  @JoinColumn()
  teller: Employee;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => TransactionsPurpose, (tp) => tp.transactions, { nullable: true })
  @JoinColumn()
  purpose?: TransactionsPurpose;

  @Column({ type: 'enum', enum: TransactionStatus, nullable: true })
  status: TransactionStatus;

  @Column({ nullable: true })
  transactionReference?: string;

  @Column({ type: 'decimal', scale: 2, default: 0.0 })
  fee: number;

  @Column({ length: 5, default: 'PKR' })
  currencyCode: string;

  @Column({ nullable: true })
  transactionLocation?: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
