import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { CustomerType, MaritalStatus } from '@/common/constants/common.enum';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: CustomerType,
    default: CustomerType.NORMAL,
  })
  customerType: CustomerType;

  @Column({
    type: 'enum',
    enum: MaritalStatus,
    nullable: true,
  })
  maritalStatus: MaritalStatus;

  @Column({ nullable: true })
  occupation: string;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  customerSince: Date;

  @Column({ default: false })
  isVIP: boolean;

  @Column({ nullable: true })
  creditScore: number;

  @CreateDateColumn()
  registeredAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.customer)
  @JoinColumn()
  user: User;
}
