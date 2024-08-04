import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  CreateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Session extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @ApiProperty()
  @Column({ type: String, nullable: false, unique: true })
  accountId: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
