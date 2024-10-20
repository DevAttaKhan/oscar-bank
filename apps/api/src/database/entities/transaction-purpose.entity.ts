import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export class TransactionsPurpose {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  purpose: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Transaction, (transaction) => transaction.purpose)
  transactions: Transaction[];
}
