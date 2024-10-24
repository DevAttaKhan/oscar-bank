import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export class TransactionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: true })
  isReversible: boolean;

  @Column({ type: 'decimal', scale: 2, default: 0.0 })
  associatedFee: number;

  @Column({ default: false })
  requiresAuthorization: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.transactionType)
  transactions: Transaction[];
}
