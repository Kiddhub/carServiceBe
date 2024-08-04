import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Service extends EntityHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: String, nullable: false })
  groupServiceCode: string;

  @ApiProperty()
  @Column({ type: String, nullable: false })
  name: string;
  @ApiProperty()
  @Column({ type: String, nullable: false })
  description: string;
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
