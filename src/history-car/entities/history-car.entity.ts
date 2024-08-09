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
export class HistoryCar extends EntityHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column({ type: String, nullable: false })
  carId: string;
  @ApiProperty()
  checkIn: Date;
  @ApiProperty()
  checkOut: Date;
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
