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
export class User extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: String, nullable: true })
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  dob: Date;

  @ApiProperty()
  @Column({ type: Number, nullable: true })
  roleId: number;

  @ApiProperty()
  @Index()
  @Column({ type: String, nullable: true })
  email: string;

  @ApiProperty()
  @Column({ type: String, nullable: true })
  @Index()
  phone: string;

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
