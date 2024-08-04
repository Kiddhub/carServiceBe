import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class GroupService extends EntityHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Index()
  @Column({ type: String, nullable: false, unique: true })
  key: string;

  @ApiProperty()
  @Column({ type: String, nullable: false })
  value: string;

  @ApiProperty()
  @Column({ type: String, nullable: false })
  status: string;

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
