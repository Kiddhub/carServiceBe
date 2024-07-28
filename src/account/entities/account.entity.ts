import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Account extends EntityHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Index()
  @Column({ type: String, nullable: false, unique: true })
  phone: string;
  @ApiProperty()
  @Column({ type: String, nullable: false })
  password: string;

  @ApiProperty({ type: () => User })
  @OneToOne(() => User, (user) => user.account)
  @JoinColumn({ name: 'userId' })
  user: User;
  @Column({ type: Number, nullable: false })
  userId: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
