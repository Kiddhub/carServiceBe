import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { Account } from '../../account/entities/account.entity';

@Entity()
export class Session extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, {
    eager: true,
  })
  @Index()
  account: Account;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
