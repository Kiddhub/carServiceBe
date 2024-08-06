import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';

export class UserCar extends EntityHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column({ type: String, nullable: false })
  mode: string;
  @ApiProperty()
  @Column({ type: String, nullable: false })
  plateNumber: string;
  @ApiProperty()
  @Column({ type: String, nullable: false })
  color: string;
  @ApiProperty()
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
