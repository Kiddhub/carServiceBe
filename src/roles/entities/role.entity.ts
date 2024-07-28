import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNumber } from 'class-validator';

@Entity()
export class Role extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryColumn()
  @IsNumber()
  id: number;
  @Allow()
  @ApiProperty({ example: 'Admin' })
  @Column()
  name?: string;
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
