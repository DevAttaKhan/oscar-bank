import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Card } from './card.entity';

@Entity()
export class CardType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', default: 0.0 })
  maintenanceFee: number;

  @Column({ type: 'decimal', default: 0.0 })
  withdrawalLimit: number;

  @Column({ type: 'decimal', default: 0.0 })
  minBalanceRequired: number;

  @Column({ type: 'decimal', default: 0.0 })
  annualFee: number;

  @Column({ type: 'decimal', default: 0.0 })
  cashBackPercentage: number;

  @Column({ default: 1 })
  rewardPointsMultiplier: number;

  @Column({ default: false })
  internationalUsage: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Card, (card) => card.cardType)
  cards: Card[];
}
