import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/entities/role.entity';

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
  @OneToOne(() => Role, { eager: true })
  role: Role;

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
  @ApiProperty({ type: Number, nullable: true })
  accountId: number;
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
