import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Account } from './account.entity';
import { User } from './user.entity';
import { CardStatus } from '@/common/constants/common.enum';
import { CardType } from './card-type.entity';

@Entity({ name: 'cards' })
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account)
  @JoinColumn()
  account: Account;

  @Column({ type: 'varchar', length: 20, unique: true })
  cardNumber: string;

  @ManyToOne(() => CardType, (ct) => ct.cards)
  @JoinColumn()
  cardType: CardType;

  @Column({ nullable: true })
  expirationDate: Date;

  @Column({ type: 'varchar', length: 4 })
  cvv: string;

  @ManyToOne(() => User, (user) => user.cards)
  cardHolder: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  issuedDate: Date;

  @Column({ nullable: true })
  paymentDueDate: Date;

  @Column({ nullable: true })
  lastPaymentDate: Date;

  @Column({
    type: 'enum',
    enum: CardStatus,
    default: CardStatus.INACTIVE,
  })
  status: CardStatus;

  @Column({ type: 'decimal', default: 0.0 })
  rewardsBalance: number;

  @Column({ type: 'decimal', default: 0.0 })
  cashbackAccrued: number;

  @Column({ nullable: true })
  cardImageUrl: string;
}
