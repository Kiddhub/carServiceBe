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
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @ApiProperty()
  @Column({ type: String, nullable: false, unique: true })
  accountId: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
